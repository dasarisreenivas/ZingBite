package com.app.zingbitedao;

import java.util.List;
import com.app.zingbitemodels.WishlistItem;
import com.app.zingbitemodels.Menu;

public interface WishlistDAO {
    boolean addToWishlist(WishlistItem item);
    boolean removeFromWishlist(int userId, int menuId);
    List<WishlistItem> getWishlistByUser(int userId);
    boolean isFavorite(int userId, int menuId);
    List<Menu> getWishlistMenusByUser(int userId);
}
