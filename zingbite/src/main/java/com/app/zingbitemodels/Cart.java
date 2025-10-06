package com.app.zingbitemodels;

import java.util.HashMap;
import java.util.Map;

public class Cart {

	private Map<Integer,CartItem> items;
	
	public Cart() {
		this.items = new HashMap<>();
	}
	
	public void addItemToCart(CartItem item) {
		int itemId = item.getItemId();
		if(items.containsKey(itemId)) {
			CartItem existingItem = items.get(itemId);
			existingItem.setQuantity(existingItem.getQuantity()+item.getQuantity());
		}else {
			items.put(itemId, item);
		}
	}
	
	public void updateCartItem(int itemId,int quantity) {
		if(items.containsKey(itemId)) {
			if(quantity<=0) {
				items.remove(itemId);
			}else {
				items.get(itemId).setQuantity(quantity);
			}
		}
	}
	
	public void removeItemFromCart(int itemId) {
		items.remove(itemId);
	}
	
	public Map<Integer,CartItem> getItems(){
		return items;
	}
	
	public void clear() {
		items.clear();
	}
}
