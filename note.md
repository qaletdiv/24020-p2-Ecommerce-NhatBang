git # 24020-p2-Ecommerce-NhatBang
```sh
git remote add origin2 <Link_Repo_Moi> 
git remote -v // coi repo
git push origin main
git push origin2 main
```
# Cac moi quan he trong CSDL MySQL
```sh
categories - products (1-n)
# products - productImages (1-n)
users - carts (1 - n)
products - carts (1-n)
users - History Orders (1-n)
History Orders - Order items (1-n)


products - order items (1-n)
```
# Anh quan he database
![Image database](/image/image_database.png)
# Cac thu vien cai dat nodejs 

```sh
npm init -y
npm install --save-dev nodemon
# "dev":"nodemon server.js"

# cai dat database va cai dat thu vien express
npm i sequelize mysql2 npm install express

# file .env : chua bao mat thong tin nhay cam
npm i dotenv 

# cai dat validator 
npm install express-validator

# cai dat authorize va authenticate 
npm i bcrypt jsonwebtoken

# upload hinh anh -- cai dat Dependencies  
npm install multer sharp helmet express-rate-limit
```

