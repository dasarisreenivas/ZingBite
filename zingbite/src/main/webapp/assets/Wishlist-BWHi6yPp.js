import{i as e,l as t,n,p as r}from"./createLucideIcon-DINBtofy.js";import{t as i}from"./minus-B6UvmiKr.js";import{t as a}from"./plus-C8GSwVgf.js";import{t as o}from"./shopping-bag-BHGVmEJA.js";import{t as s}from"./trash-2-S9G2r2rV.js";import{T as c,g as l,t as u}from"./index-KKOKVewU.js";r();var d=n(),f=`https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1760&auto=format&fit=crop`,p=()=>{let{wishlist:n,toggleWishlist:r,loading:p}=u(),{cart:m,addToCart:h,updateQuantity:g}=c();t();let _=e=>{if(!m||!m.items)return 0;let t=(Array.isArray(m.items)?m.items:Object.values(m.items)).find(t=>t.itemId===e);return t?t.quantity:0},v=e=>{let t=[`chicken`,`mutton`,`egg`,`fish`,`pork`,`beef`,`shrimp`,`prawn`,`meat`,`kebab`,`tikka`,`biryani`],n=(e.menuName||``).toLowerCase(),r=(e.description||``).toLowerCase();return!t.some(e=>n.includes(e)||r.includes(e))};return p?(0,d.jsx)(`div`,{style:{display:`flex`,justifyContent:`center`,alignItems:`center`,minHeight:`400px`},children:(0,d.jsx)(`div`,{className:`skeleton`,style:{width:`48px`,height:`48px`,borderRadius:`50%`}})}):n.length===0?(0,d.jsxs)(`div`,{className:`page-enter`,style:{display:`flex`,flexDirection:`column`,alignItems:`center`,justifyContent:`center`,padding:`100px 20px`,textAlign:`center`},children:[(0,d.jsx)(`div`,{style:{width:`100px`,height:`100px`,borderRadius:`50%`,background:`rgba(247,55,79,0.06)`,display:`flex`,alignItems:`center`,justifyContent:`center`,marginBottom:`24px`},children:(0,d.jsx)(l,{size:44,color:`var(--brand-red)`,strokeWidth:1.2})}),(0,d.jsx)(`h3`,{style:{fontSize:`1.6rem`,fontWeight:800,marginBottom:`8px`,fontFamily:`'Outfit', sans-serif`},children:`Your wishlist is empty`}),(0,d.jsx)(`p`,{style:{color:`var(--text-secondary)`,marginBottom:`28px`,fontSize:`0.95rem`,maxWidth:`400px`},children:`Save your favorite meals here to order them quickly anytime you crave them!`}),(0,d.jsxs)(e,{to:`/`,style:{padding:`14px 36px`,background:`linear-gradient(135deg, var(--brand-red), #d42d42)`,color:`#fff`,borderRadius:`12px`,fontWeight:700,textDecoration:`none`,boxShadow:`0 8px 24px rgba(247,55,79,0.25)`,transition:`transform 0.2s, box-shadow 0.2s`,display:`inline-flex`,alignItems:`center`,gap:`8px`},onMouseEnter:e=>{e.target.style.transform=`translateY(-2px)`,e.target.style.boxShadow=`0 12px 32px rgba(247,55,79,0.35)`},onMouseLeave:e=>{e.target.style.transform=``,e.target.style.boxShadow=`0 8px 24px rgba(247,55,79,0.25)`},children:[(0,d.jsx)(o,{size:16}),` EXPLORE MENU`]})]}):(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(`style`,{children:`
        .wishlist-container {
          max-width: 1200px;
          width: 92%;
          margin: 40px auto 64px;
        }
        .wishlist-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 32px;
          border-bottom: 1.5px solid var(--border-light);
          padding-bottom: 16px;
        }
        .wishlist-header h2 {
          font-family: 'Outfit', sans-serif;
          font-weight: 800;
          font-size: 1.8rem;
          margin: 0;
          color: var(--text-primary);
        }
        .wishlist-count {
          font-size: 0.85rem;
          color: var(--brand-red);
          background: rgba(247, 55, 79, 0.06);
          padding: 4px 12px;
          border-radius: 20px;
          border: 1px solid rgba(247, 55, 79, 0.12);
          font-weight: 700;
        }
        .wishlist-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
          gap: 24px;
        }
        .wishlist-card {
          background: #fff;
          border: 1px solid var(--border-light);
          border-radius: 20px;
          padding: 20px;
          display: flex;
          gap: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
          transition: all 0.3s var(--ease-premium);
          position: relative;
        }
        .wishlist-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 30px rgba(247, 55, 79, 0.05);
          border-color: rgba(247, 55, 79, 0.1);
        }
        .wishlist-card-details {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-width: 0;
        }
        .wishlist-card-img-wrapper {
          position: relative;
          width: 100px;
          height: 100px;
          flex-shrink: 0;
        }
        .wishlist-card-img {
          width: 100%;
          height: 100%;
          border-radius: 12px;
          object-fit: cover;
          border: 1px solid var(--border-light);
        }
        .wishlist-card-title {
          font-family: 'Outfit', sans-serif;
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0 0 4px;
          line-height: 1.3;
        }
        .wishlist-card-price {
          font-weight: 800;
          font-size: 1.1rem;
          color: var(--brand-red);
          margin-bottom: 8px;
        }
        .wishlist-card-desc {
          font-size: 0.8rem;
          color: var(--text-secondary);
          line-height: 1.4;
          margin: 0 0 12px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .remove-icon-btn {
          position: absolute;
          top: 12px;
          right: 12px;
          background: transparent;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          transition: color 0.2s;
          padding: 4px;
        }
        .remove-icon-btn:hover {
          color: var(--danger);
        }
      `}),(0,d.jsxs)(`div`,{className:`wishlist-container page-enter`,children:[(0,d.jsxs)(`div`,{className:`wishlist-header`,children:[(0,d.jsx)(`h2`,{children:`My Favorites`}),(0,d.jsxs)(`span`,{className:`wishlist-count`,children:[n.length,` ITEM`,n.length===1?``:`S`]})]}),(0,d.jsx)(`div`,{className:`wishlist-grid`,children:n.map(e=>{let t=_(e.menuId),n=v(e);return(0,d.jsxs)(`div`,{className:`wishlist-card`,children:[(0,d.jsx)(`button`,{type:`button`,className:`remove-icon-btn`,onClick:()=>r(e),"aria-label":`Remove item`,children:(0,d.jsx)(s,{size:16})}),(0,d.jsx)(`div`,{className:`wishlist-card-img-wrapper`,children:(0,d.jsx)(`img`,{src:e.imagePath||f,alt:e.menuName,className:`wishlist-card-img`,onError:e=>{e.currentTarget.onerror=null,e.currentTarget.src=f}})}),(0,d.jsxs)(`div`,{className:`wishlist-card-details`,children:[(0,d.jsxs)(`div`,{children:[(0,d.jsx)(`div`,{className:`dish-card-header-tags`,style:{marginBottom:`6px`},children:(0,d.jsxs)(`div`,{className:n?`dish-type-badge veg`:`dish-type-badge nonveg`,children:[(0,d.jsx)(`span`,{className:`dot`}),(0,d.jsx)(`span`,{children:n?`VEG`:`NON-VEG`})]})}),(0,d.jsx)(`h3`,{className:`wishlist-card-title`,children:e.menuName}),(0,d.jsx)(`p`,{className:`wishlist-card-desc`,children:e.description})]}),(0,d.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,justifyContent:`space-between`},children:[(0,d.jsxs)(`div`,{className:`wishlist-card-price`,children:[`₹`,e.price]}),(0,d.jsx)(`div`,{style:{position:`relative`},children:t===0?(0,d.jsx)(`button`,{className:`add-btn`,disabled:!e.isAvailable,onClick:()=>h(e.menuId,1),children:e.isAvailable?`ADD`:`SOLD OUT`}):(0,d.jsxs)(`div`,{className:`qty-stepper`,style:{position:`static`},children:[(0,d.jsx)(`button`,{className:`step-btn`,onClick:()=>g(e.menuId,t-1),children:(0,d.jsx)(i,{size:12})}),(0,d.jsx)(`span`,{className:`step-val`,children:t}),(0,d.jsx)(`button`,{className:`step-btn`,onClick:()=>g(e.menuId,t+1),children:(0,d.jsx)(a,{size:12})})]})})]})]})]},e.menuId)})})]})]})};export{p as default};