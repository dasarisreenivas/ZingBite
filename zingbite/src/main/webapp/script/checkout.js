/**
 * checkout.js — Leaflet map initialization and delivery address handling
 * for the ZingBite checkout page.
 *
 * Supports three address modes:
 *   1. "profile"  — use the address from the user's profile (geocode it)
 *   2. "manual"   — type an address or click on the map
 *   3. "current"  — use the browser's Geolocation API
 */
(function () {
    'use strict';

    // ─── Default center (Bangalore hub) ───
    var HUB_LAT = 12.9716;
    var HUB_LON = 77.5946;
    var DEFAULT_ZOOM = 14;

    // ─── DOM references ───
    var mapContainer  = document.getElementById('checkout-map');
    var addressInput  = document.getElementById('delivery-address');
    var latInput      = document.getElementById('address-lat');
    var lngInput      = document.getElementById('address-lng');
    var addressText   = document.getElementById('address-text');
    var payButton     = document.getElementById('proceed-pay');
    var addressRadios = document.querySelectorAll('input[name="addressChoice"]');

    // ─── Exit early if map container not found ───
    if (!mapContainer) return;

    // ─── Initialize Leaflet map ───
    var map = L.map('checkout-map', {
        zoomControl: true,
        scrollWheelZoom: true
    }).setView([HUB_LAT, HUB_LON], DEFAULT_ZOOM);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19
    }).addTo(map);

    // Fix Leaflet rendering in hidden/resized containers
    setTimeout(function () { map.invalidateSize(); }, 300);

    // ─── Delivery marker (draggable) ───
    var deliveryIcon = L.divIcon({
        html: '<span style="font-size:28px;">📍</span>',
        className: 'custom-checkout-marker',
        iconSize: [28, 28],
        iconAnchor: [14, 28]
    });

    var marker = null;

    /**
     * Place or move the delivery marker and update hidden fields.
     */
    function setMarker(lat, lng) {
        if (marker) {
            marker.setLatLng([lat, lng]);
        } else {
            marker = L.marker([lat, lng], {
                icon: deliveryIcon,
                draggable: true
            }).addTo(map);

            // When user drags the marker, update coordinates
            marker.on('dragend', function (e) {
                var pos = e.target.getLatLng();
                updateCoordinates(pos.lat, pos.lng);
                reverseGeocode(pos.lat, pos.lng);
            });
        }
        marker.bindPopup('Delivery Location').openPopup();
        map.setView([lat, lng], Math.max(map.getZoom(), DEFAULT_ZOOM));
        updateCoordinates(lat, lng);
    }

    /**
     * Write lat/lng into hidden form fields.
     */
    function updateCoordinates(lat, lng) {
        latInput.value = lat.toFixed(6);
        lngInput.value = lng.toFixed(6);
    }

    /**
     * Reverse geocode using Nominatim (free, no API key).
     */
    function reverseGeocode(lat, lng) {
        var url = 'https://nominatim.openstreetmap.org/reverse?format=json&lat=' +
                  lat + '&lon=' + lng + '&zoom=18&addressdetails=1';

        fetch(url, {
            headers: { 'Accept-Language': 'en' }
        })
        .then(function (res) { return res.json(); })
        .then(function (data) {
            if (data && data.display_name) {
                addressInput.value = data.display_name;
                addressText.value  = data.display_name;
            }
        })
        .catch(function (err) {
            console.warn('[checkout.js] Reverse geocode failed:', err);
        });
    }

    /**
     * Forward geocode an address string to lat/lng via Nominatim.
     */
    function forwardGeocode(address) {
        if (!address || address.trim().length < 3) return;

        var url = 'https://nominatim.openstreetmap.org/search?format=json&q=' +
                  encodeURIComponent(address) + '&limit=1';

        fetch(url, {
            headers: { 'Accept-Language': 'en' }
        })
        .then(function (res) { return res.json(); })
        .then(function (results) {
            if (results && results.length > 0) {
                var lat = parseFloat(results[0].lat);
                var lng = parseFloat(results[0].lon);
                setMarker(lat, lng);
                addressText.value = results[0].display_name || address;
            }
        })
        .catch(function (err) {
            console.warn('[checkout.js] Forward geocode failed:', err);
        });
    }

    // ─── Map click → place marker ───
    map.on('click', function (e) {
        setMarker(e.latlng.lat, e.latlng.lng);
        reverseGeocode(e.latlng.lat, e.latlng.lng);

        // Switch to manual mode when user clicks map
        var manualRadio = document.querySelector('input[name="addressChoice"][value="manual"]');
        if (manualRadio) manualRadio.checked = true;
    });

    // ─── Address mode radio handlers ───
    addressRadios.forEach(function (radio) {
        radio.addEventListener('change', function () {
            handleAddressMode(this.value);
        });
    });

    function handleAddressMode(mode) {
        switch (mode) {
            case 'profile':
                // Use the pre-filled address from the profile
                var profileAddr = addressInput.value.trim();
                if (profileAddr) {
                    addressText.value = profileAddr;
                    forwardGeocode(profileAddr);
                }
                addressInput.readOnly = true;
                break;

            case 'manual':
                addressInput.readOnly = false;
                addressInput.placeholder = 'Type address or click on the map';
                addressInput.focus();
                break;

            case 'current':
                addressInput.readOnly = true;
                useCurrentLocation();
                break;
        }
    }

    /**
     * Use the browser Geolocation API to get the user's current position.
     */
    function useCurrentLocation() {
        if (!navigator.geolocation) {
            showMapMessage('Geolocation is not supported by your browser.');
            return;
        }

        // Show loading state
        addressInput.value = 'Detecting your location...';
        addressInput.disabled = true;

        navigator.geolocation.getCurrentPosition(
            function (position) {
                var lat = position.coords.latitude;
                var lng = position.coords.longitude;
                setMarker(lat, lng);
                reverseGeocode(lat, lng);
                addressInput.disabled = false;
            },
            function (error) {
                addressInput.disabled = false;
                var msg = 'Unable to detect location.';
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        msg = 'Location permission denied. Please allow location access or pick on the map.';
                        break;
                    case error.POSITION_UNAVAILABLE:
                        msg = 'Location unavailable. Please pick your delivery address on the map.';
                        break;
                    case error.TIMEOUT:
                        msg = 'Location request timed out. Please pick on the map.';
                        break;
                }
                showMapMessage(msg);
                addressInput.value = '';
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 60000
            }
        );
    }

    /**
     * Show a temporary message below the map.
     */
    function showMapMessage(msg) {
        var hint = document.querySelector('.map-hint');
        if (hint) {
            var origText = hint.textContent;
            hint.textContent = msg;
            hint.style.color = '#F7374F';
            hint.style.fontWeight = '600';
            setTimeout(function () {
                hint.textContent = origText;
                hint.style.color = '';
                hint.style.fontWeight = '';
            }, 5000);
        }
    }

    // ─── Debounced address input → forward geocode ───
    var geocodeTimer = null;
    addressInput.addEventListener('input', function () {
        clearTimeout(geocodeTimer);
        var val = this.value.trim();
        addressText.value = val;
        geocodeTimer = setTimeout(function () {
            forwardGeocode(val);
        }, 800);
    });

    // ─── Payment validation: ensure location is set ───
    if (payButton) {
        var originalOnclick = payButton.onclick;
        payButton.onclick = function (e) {
            // Ensure we have coordinates
            if (!latInput.value || !lngInput.value) {
                e.preventDefault();
                e.stopPropagation();
                showMapMessage('Please select your delivery location on the map before paying.');
                // Scroll to map
                mapContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
                return false;
            }
            // Ensure address text is synced
            if (!addressText.value) {
                addressText.value = addressInput.value;
            }
            // Call original handler
            if (originalOnclick) {
                return originalOnclick.call(this, e);
            }
        };
    }

    // ─── Initialize: try to geocode profile address if present ───
    var initialAddress = addressInput ? addressInput.value.trim() : '';
    if (initialAddress) {
        addressText.value = initialAddress;
        forwardGeocode(initialAddress);
    }

    // ─── Add a "Locate Me" button to the map ───
    var LocateControl = L.Control.extend({
        options: { position: 'topright' },
        onAdd: function () {
            var btn = L.DomUtil.create('button', 'leaflet-bar leaflet-locate-btn');
            btn.innerHTML = '📍';
            btn.title = 'Use my current location';
            btn.style.cssText = 'width:36px;height:36px;font-size:18px;cursor:pointer;background:#fff;border:2px solid rgba(0,0,0,0.2);border-radius:4px;display:flex;align-items:center;justify-content:center;';
            btn.type = 'button';

            L.DomEvent.disableClickPropagation(btn);
            btn.addEventListener('click', function () {
                var currentRadio = document.querySelector('input[name="addressChoice"][value="current"]');
                if (currentRadio) currentRadio.checked = true;
                useCurrentLocation();
            });
            return btn;
        }
    });
    new LocateControl().addTo(map);

})();
