const imageUrl = req.body.imageUrl;

await db.execute(
  "INSERT INTO product (name, price, main_image) VALUES (?, ?, ?)",
  [req.body.name, req.body.price, imageUrl]
);