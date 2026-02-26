// slug - human redable , seo friendly url -public
//sku - stock keeping unit  --internal 

import db from '../config/db.js';

const createProductTable=()=>{
    db.execute(
        `create table if not exists product(
        id int auto_increment primary key,
        name varchar(100) not null,
         slug varchar(150) not null unique,
         sku varchar(150) unique ,
         price decimal(10,2) not null,
        discount_price decimal(10,2) default null ,
        stock_quantity int not null,
        description text not null,
        main_image varchar(255),

        vendor_id int not null,
        category_id int not null,

        is_active tinyint(1) default 1,
        is_admin_verified tinyint(1) default 0,

        rating_avg decimal(3,2) default 0,
        rating_count int default 0, 
        sold_count int default 0,

        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            ON UPDATE CURRENT_TIMESTAMP,

        foreign key(vendor_id) references vendor(id),
        foreign key(category_id) references category(id)
        )`);
        console.log("Products table created ");
}
export default createProductTable;

export const createProduct=async(name,slug,sku,price, discount_price,stock_quantity,description,main_image,vendor_id,category_id)=>{
    const [res]=await db.execute(
        `insert into product(name,slug,sku,price, discount_price,stock_quantity,description,main_image,vendor_id,category_id) values (?,?,?,?,?,?,?,?,?,?)`,
        [name,slug,sku,price, discount_price,stock_quantity,description,main_image,vendor_id,category_id]
    );
    return res;
}

export const updateProduct=async(id,name,slug,sku,price, discount_price,stock_quantity,description,main_image,category_id)=>{
    const[res]=await db.execute(
        `update product set name=?,slug=?,sku=?,price=?, discount_price=?,stock_quantity=?,description=?,main_image=?,category_id=? where id=? and is_active=1 `,
        [name,slug,sku,price, discount_price,stock_quantity,description,main_image,category_id,id]
    );
    return res;
}
export const getAllProducts=async()=>{
    const [res]=await db.execute(
        `select * from product where is_active=1 and is_admin_verified=1`
    );
    return res;
}
export const getProductById=async(id)=>{
    const [res]=await db.execute(
        `select * from product where id=?  and is_active=1 and is_admin_verified=1`,[id]
    );
    return res[0];
}
export const deleteProduct=async(product_id,vendor_id)=>{
    const [res]=await db.execute(
        `update product set is_active=0 where id=? and vendor_id=?`,[product_id,vendor_id]
    );
    return res;
}
export const getProductsByCategory=async(category_id)=>{
    const [res]=await db.execute(
        `select * from product where category_id=? and is_active=1`,[category_id]
    );
    return res;
}

export const getProductsByVendor=async(vendor_id)=>{
    const [res]=await db.execute(
        `select * from product where vendor_id=?`,[vendor_id]
    );
    return res;
}
export const approveProduct=async(id)=>{
    const [res]=await db.execute(
        `update product set is_admin_verified=1 where id=? and is_admin_verified=0`,[id]
    );
    return res;
}
export const rejectProduct=async(id)=>{
    const [res]=await db.execute(
        `update product set is_admin_verified=0 where id=? and is_admin_verified=1`,[id]
    );
    return res;
}
export const toggleProductStatus=async(id,is_active)=>{
    const [res]=await db.execute(
        `update product set is_active=? where id=?`,[is_active,id]
    );
    return res;
}
export const getProductBySlug=async(slug)=>{
    const [res]=await db.execute(
        `select * from product where slug=? and is_active=1`,[slug]
    );
    return res;
}
export const searchProduct=async(keyword)=>{
    const [res]=await db.execute(
        `select * from product where name like ? and is_active=1 and is_admin_verified=1`,[`%${keyword}%`]
    );
    return res;
}

export const filterProduct=async(minPrice,maxPrice,category_id)=>{
    const [res]=await db.execute(
        `select * from product where price between ? and ? and category_id=? and is_active=1 and is_admin_verified=1`,
        [minPrice,maxPrice,category_id]
    );
    return res;
}

export const sortProducts=async(sortBy="created_at",order="DESC")=>{
    const allowSort=["price","created_at","sold_count"];
        if(!allowSort.includes(sortBy)) sortBy="created_at";
        const [res]=await db.execute(
            `select * from product where is_active=1 and is_admin_verified=1
            order by ${sortBy} ${order}`
        );
        return res;
}

export const updateStock=async(id,quantity)=>{
    const [res]=await db.execute(
        `update product set stock_quantity=stock_quantity-? where id=? and stock_quantity>=?`,
        [quantity ,id,quantity]
    );
    return res;
}
export const pendingProducts=async()=>{
    const [res]=await db.execute(
        `select * from product where is_admin_verified=0`
    );
    return res;
}