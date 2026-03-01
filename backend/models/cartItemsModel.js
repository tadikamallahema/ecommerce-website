import db from '../config/db.js';

const createCartItemTable=()=>{
    db.execute(
        `create table if not exists cart_items(
        id int auto_increment primary key,
        cart_id int not null ,
        product_id int not null  ,
        quantity int not null default 1,
        price_at_time decimal(10,2) not null,

        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

        unique(cart_id,product_id),
        foreign key(cart_id) references cart(id)
        on delete cascade,
        foreign key(product_id) references product(id)
        on delete cascade

        )`
    );
    console.log("CartItem Table is created");
};

export default createCartItemTable;


export const addItemToCart=async(cart_id,product_id,quantity,price_at_time)=>{
    await db.execute(
        `insert into cart_items (cart_id,product_id,quantity,price_at_time) values (?,?,?,?)
        on duplicate key update 
        quantity =quantity+values(quantity)`,[cart_id,product_id,quantity,price_at_time]
    );
}

export const getCartItems=async(cart_id)=>{
    const [rows]=await db.execute(
        `select ci.id,ci.quantity,ci.price_at_time,p.id AS product_id,p.name,p.main_image
        FROM cart_items ci
        JOIN product p ON ci.product_id = p.id
        WHERE ci.cart_id = ?`,[cart_id]
    );
    return rows;
}

export const updateQuantity = async (cartId, productId, quantity) => {
  await db.execute(
    `UPDATE cart_items 
     SET quantity = ? 
     WHERE cart_id = ? AND product_id = ?`,
    [quantity, cartId, productId]
  );
};
  
export const removeCartItems=async(cart_id,product_id)=>{
    await db.execute(
        `delete from cart_items
        where cart_id=? and product_id=?`,[cart_id,product_id]
    );
};
export const clearCart = async (cartId) => {
    await db.execute(
        `DELETE FROM cart_items WHERE cart_id = ?`,
        [cartId]
    );
};