﻿using Botanify.Models;
using BotanifyApplication.Models;
using MySql.Data.MySqlClient;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure.MappingViews;
using System.Data.Entity.Migrations;
using System.Data.SqlClient;
using System.Linq;
using System.Net.Http.Headers;
using System.Net.Http;
using System.Runtime.Remoting.Messaging;
using System.Text;
using System.Web;
using System.Web.Mvc;
using System.Threading.Tasks;
using Stripe;
using System.IO;


namespace BotanifyApplication.Controllers
{
    public class HomeController : Controller
    {

        public ActionResult LandingPage()
        {
            return View();
        }

        public ActionResult LoginPage()
        {
            return View();
        }

        public ActionResult RegisterPage()
        {
            return View();
        }
        public ActionResult ShopPage()
        {
            return View();
        }
        public ActionResult ProductPage()
        {
            return View();
        }
        public ActionResult CartPage()
        {
            return View();
        }

        public ActionResult AccountPage()
        {
            return View();
        }

        public ActionResult SuccessPage()
        {
            return View();
        }

        public ActionResult DashProducts()
        {
            return View();
        }

        public ActionResult DashUsers()
        {
            return View();
        }

        public ActionResult DashOrders()
        {
            return View();
        }

        public ActionResult DashReports()
        {
            return View();
        }

        public void RegisterUser(RegistrationDTO regData)
        {
            using (var db = new BotanifyContext())
            {
                var userData = new users_tblModel()
                {
                    firstName = regData.fName,
                    lastName = regData.lName,
                    address = regData.uAddress,
                    city = regData.uCity,
                    region = regData.uRegion,
                    zipcode = regData.uPostal,
                    userEmail = regData.uEmail,
                    userPassword = regData.uPassword,
                    userPhone = regData.uPhone,
                    createAt = DateTime.Now,
                    updateAt = DateTime.Now
                };

                db.users_tbl.Add(userData);
                db.SaveChanges();
            }
        }

        public JsonResult CheckEmail(string userEmail)
        {
            using (var db = new BotanifyContext())
            {
                bool emailExists = db.users_tbl.Any(u => u.userEmail == userEmail);
                return Json(emailExists, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult AddToCart(CartDTO cartData)
        {
            try
            {
                using (var db = new BotanifyContext())
                {
                    var existingCartItem = db.carts_tbl
                        .FirstOrDefault(c => c.userId == cartData.userIdLocal
                                        && c.productId == cartData.productIdLocal);

                    if (existingCartItem != null)
                    {
                        existingCartItem.productQty += cartData.prodQtyLocal;
                        existingCartItem.updateAt = DateTime.Now;
                    }
                    else
                    {
                        var cartItem = new carts_tblModel()
                        {
                            userId = cartData.userIdLocal,
                            productId = cartData.productIdLocal,
                            productQty = cartData.prodQtyLocal,
                            createAt = DateTime.Now,
                            updateAt = DateTime.Now
                        };
                        db.carts_tbl.Add(cartItem);
                    }

                    db.SaveChanges();
                    return Json(new { success = true, message = "Product added to cart successfully." }, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = "Error adding product to cart: " + ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }


        public JsonResult GetCartItems(int userId)
        {
            using (var db = new BotanifyContext())
            {
                var cartItems = (from c in db.carts_tbl
                                 join p in db.products_tbl on c.productId equals p.productId
                                 join s in db.sizes_tbl on p.sizeId equals s.sizeId
                                 join cat in db.categories_tbl on p.categoryId equals cat.categoryId
                                 where c.userId == userId
                                 select new
                                 {
                                     c.cartId,
                                     p.productId,
                                     p.productName,
                                     p.productDescription,
                                     p.productImage,
                                     p.productPrice,
                                     p.productStock,
                                     c.productQty,
                                     sizeName = s.size,
                                     category = cat.categoryName
                                 }).ToList();

                if (cartItems.Any())
                {
                    return Json(new { success = true, cartItems }, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json(new { success = false, message = "No items in cart." }, JsonRequestBehavior.AllowGet);
                }
            }
        }

        public JsonResult DeleteCartItem(int cartId)
        {
            using (var db = new BotanifyContext())
            {
                var cartItem = (from c in db.carts_tbl
                                where c.cartId == cartId
                                select c).FirstOrDefault();

                if (cartItem != null)
                {
                    var sql = "DELETE FROM carts_tbl WHERE cartId = @cartId";
                    db.Database.ExecuteSqlCommand(sql, new MySqlParameter("@cartId", cartId));

                    db.SaveChanges();

                    return Json(new { success = true, message = "Cart item deleted successfully." }, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json(new { success = false, message = "Cart item not found." }, JsonRequestBehavior.AllowGet);
                }
            }
        }

        public JsonResult DeleteCartItems(int userId)
        {
            using (var db = new BotanifyContext())
            {
                var cartExists = db.carts_tbl.Any(c => c.userId == userId);

                if (!cartExists)
                {
                    return Json(new { success = false, message = $"No items found for userId {userId}." });
                }

                var sql = "DELETE FROM carts_tbl WHERE userId = @userId";
                db.Database.ExecuteSqlCommand(sql, new MySqlParameter("@userId", userId));

                db.SaveChanges();

                return Json(new { success = true, message = "Cart items deleted successfully." });
            }
        }



        public JsonResult UpdateCartItemQuantity(int cartId, int quantity)
        {
            using (var db = new BotanifyContext())
            {
                var cartItem = db.carts_tbl.FirstOrDefault(c => c.cartId == cartId);

                if (cartItem != null)
                {
                    cartItem.productQty = quantity;
                    db.SaveChanges();
                    return Json(new { success = true, message = "Quantity updated successfully." });
                }
                else
                {
                    return Json(new { success = false, message = "Cart item not found." });
                }
            }
        }

       

        public void AddProduct(ProductDTO productData)
        {
            using (var db = new BotanifyContext())
            {
                var prodData = new products_tblModel()
                {
                    productId = 1,
                    categoryId = productData.categoryIdLocal,
                    sizeId = productData.sizeIdLocal,
                    sku = productData.skuLocal.ToString(),
                    productName = productData.prodName.ToString(),
                    productDescription = productData.prodDescription.ToString(),
                    productSciName = productData.prodSciName.ToString(),
                    productImage = productData.prodImage.ToString(),
                    productPrice = productData.prodPrice,
                    productStock = productData.prodStock,
                    productTips = productData.prodTips.ToString(),
                    createAt = DateTime.Now,
                    updateAt = DateTime.Now
                };

                db.products_tbl.Add(prodData);
                db.SaveChanges();
            }
        }

        public void UpdateProduct(ProductDTO productData)
        {
            using (var db = new BotanifyContext())
            {
                var product = db.products_tbl.FirstOrDefault(x => x.productId == productData.productId);

                if (product == null)
                {
                    throw new KeyNotFoundException($"Product with ID {productData.productId} not found");
                }

                product.sku = productData.skuLocal;
                product.categoryId = productData.categoryIdLocal;
                product.sizeId = productData.sizeIdLocal;
                product.productName = productData.prodName;
                product.productDescription = productData.prodDescription;
                product.productSciName = productData.prodSciName;
                product.productImage = productData.prodImage;
                product.productPrice = productData.prodPrice;
                product.productStock = productData.prodStock;
                product.productTips = productData.prodTips;
                product.updateAt = DateTime.Now;

                db.Entry(product).State = EntityState.Modified;
                db.SaveChanges();
            }
        }

        public JsonResult LoadOrder ()
        {
            using (var db = new BotanifyContext())
            {
                var orderData = (from oData in db.orders_tbl
                                 select new
                                 {
                                     oData.orderId,
                                     oData.userId,
                                     oData.checkoutSessionId,
                                     oData.referenceNumber,
                                     oData.totalAmount,
                                     oData.paymentMethod,
                                     oData.orderStatus,
                                     oData.createAt
                                 }).ToList();

                return Json(orderData, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult LoadUser()
        {
            using (var db = new BotanifyContext())
            {
                var userData = (from uData in db.users_tbl
                                select new
                                {
                                    uData.userId,
                                    uData.firstName,
                                    uData.lastName,
                                    uData.userEmail,
                                    uData.userPhone,
                                    uData.address, 
                                    uData.city,      
                                    uData.region,   
                                    uData.zipcode  
                                }).ToList(); 
                return Json(userData, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult LoadUserInfo(int userId)
        {
            using (var db = new BotanifyContext())
            {
                var uData = (from user in db.users_tbl
                             where user.userId == userId
                             select new
                             {
                                 user.userId,
                                 user.firstName,
                                 user.lastName,
                                 user.userEmail,
                                 user.userPhone,
                                 user.address,
                                 user.city,
                                 user.region,
                                 user.zipcode
                             }).FirstOrDefault();

                if (uData != null)
                {
                    return Json(new { success = true, data = uData }, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json(new { success = false, message = "User not found." }, JsonRequestBehavior.AllowGet);
                }
            }
        }

        public JsonResult LoginUser(string email, string password)
        {
            using (var db = new BotanifyContext())
            {
                var user = db.users_tbl
                    .FirstOrDefault(u => u.userEmail == email && u.userPassword == password);

                if (user != null)
                {
                    Session["UserId"] = user.userId;
                    Session["UserEmail"] = user.userEmail;
                    Session["FirstName"] = user.firstName;
                    Session["LastName"] = user.lastName;

                    return Json(new
                    {
                        success = true,
                        message = "Login successful",
                        userId = user.userId
                    }, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json(new { success = false, message = "Invalid email or password" }, JsonRequestBehavior.AllowGet);
                }
            }
        }

        public ActionResult LogoutUser()
        {
            Session["UserId"] = null;
            return Json(new { success = true }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult CheckLoginStatus()
        {
            if (Session["UserId"] != null)
            {
                return Json(new
                {
                    loggedIn = true,
                    userEmail = Session["UserEmail"].ToString(),
                    firstName = Session["FirstName"].ToString(),
                    lastName = Session["LastName"].ToString()
                }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { loggedIn = false }, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult LoadProduct()
        {
            using (var db = new BotanifyContext())
            {
                var prodData = (from pData in db.products_tbl
                                join sData in db.sizes_tbl on pData.sizeId equals sData.sizeId
                                join cData in db.categories_tbl on pData.categoryId equals cData.categoryId
                                select new
                                {
                                    pData.productId,
                                    pData.categoryId,
                                    pData.sizeId,
                                    sizeName = sData.size,
                                    category = cData.categoryName,
                                    pData.sku,
                                    pData.productName,
                                    pData.productDescription,
                                    pData.productSciName,
                                    pData.productImage,
                                    pData.productPrice,
                                    pData.productStock,
                                    pData.productTips,
                                    pData.createAt,
                                    pData.updateAt
                                }).ToList();

                return Json(prodData, JsonRequestBehavior.AllowGet);
            }
        }



        public JsonResult LoadItem(int productId)
        {
            using (var db = new BotanifyContext())
            {
                var itemData = (from pData in db.products_tbl
                                join sData in db.sizes_tbl on pData.sizeId equals sData.sizeId
                                join cData in db.categories_tbl on pData.categoryId equals cData.categoryId
                                where pData.productId == productId
                                select new
                                {
                                    pData.productId,
                                    pData.categoryId,
                                    pData.sizeId,
                                    sizeName = sData.size,
                                    category = cData.categoryName,
                                    pData.sku,
                                    pData.productName,
                                    pData.productDescription,
                                    pData.productSciName,
                                    pData.productImage,
                                    pData.productPrice,
                                    pData.productStock,
                                    pData.productTips,
                                    pData.createAt,
                                    pData.updateAt
                                }).FirstOrDefault();

                if (itemData != null)
                {
                    return Json(new { success = true, data = itemData }, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json(new { success = false, message = "Product not found." }, JsonRequestBehavior.AllowGet);
                }
            }
        }


        public JsonResult LoadFilter()
        {
            using (var db = new BotanifyContext())
            {
                var sizesData = (from sData in db.sizes_tbl
                                 select new
                                 {
                                     sData.size,
                                     sData.sizeId
                                 }).ToList();

                var categoriesData = (from cData in db.categories_tbl
                                      select new
                                      {
                                          cData.categoryName,
                                          cData.categoryId
                                      }).ToList();

                var result = new
                {
                    sizes = sizesData,
                    categories = categoriesData
                };

                return Json(result, JsonRequestBehavior.AllowGet);

            }
        }

        public JsonResult DeleteProduct(int productId)
        {
            using (var db = new BotanifyContext())
            {
                var itemData = (from pData in db.products_tbl
                                where pData.productId == productId
                                select pData).FirstOrDefault();

                if (itemData != null)
                {
                    var sql = "DELETE FROM products_tbl WHERE productId = @productId";

                    db.Database.ExecuteSqlCommand(sql, new MySqlParameter("@productId", productId));

                    db.SaveChanges();

                    return Json(new { success = true, message = "Product deleted successfully." }, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json(new { success = false, message = "Product not found." }, JsonRequestBehavior.AllowGet);
                }
            }
        }

        public JsonResult DeleteUser(int userId)
        {
            using (var db = new BotanifyContext())
            {
                var userData = (from uData in db.users_tbl
                                where uData.userId == userId
                                select uData).FirstOrDefault();

                if (userData != null)
                {
                    var sql = "DELETE FROM users_tbl WHERE userId = @userId";

                    db.Database.ExecuteSqlCommand(sql, new MySqlParameter("@userId", userId));

                    db.SaveChanges();

                    return Json(new { success = true, message = "User deleted successfully." }, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json(new { success = false, message = "User not found." }, JsonRequestBehavior.AllowGet);
                }
            }
        }



        public JsonResult SaveOrder(OrderDTO orderData)
        {
            if (orderData == null)
            {
                return Json(new { success = false, message = "Invalid order data." });
            }

            using (var db = new BotanifyContext())
            {
                try
                {
                    var order = new orders_tblModel()
                    {
                        checkoutSessionId = orderData.CheckoutSessionId,
                        referenceNumber = orderData.ReferenceNumber,
                        totalAmount = orderData.TotalAmount,
                        paymentMethod = orderData.PaymentMethod,
                        orderStatus = orderData.OrderStatus,
                        orderDate = orderData.OrderDate,
                        userId = orderData.UserId,
                        createAt = DateTime.Now,
                        updateAt = DateTime.Now
                    };

                    db.orders_tbl.Add(order);
                    db.SaveChanges();

                    return Json(new { success = true, message = "Order saved successfully." });
                }
                catch (Exception ex)
                {
                    return Json(new { success = false, message = "Error saving order: " + ex.Message });
                }
            }
        }



        public JsonResult UpdateStock(int productId, int quantityToAdjust)
        {
            if (productId <= 0 || quantityToAdjust <= 0)
            {
                return Json(new { success = false, message = "Invalid product ID or quantity." });
            }

            using (var db = new BotanifyContext())
            {
                var product = db.products_tbl.FirstOrDefault(p => p.productId == productId);

                if (product != null)
                {
                    if (product.productStock < quantityToAdjust)
                    {
                        return Json(new { success = false, message = "Insufficient stock to adjust." });
                    }

                    product.productStock -= quantityToAdjust;
                    db.SaveChanges();

                    return Json(new { success = true, message = "Stock updated successfully." });
                }
                else
                {
                    return Json(new { success = false, message = "Product not found." });
                }
            }
        }

        public JsonResult UpdateNumberPurchased(int productId, int quantityPurchased)
        {
            if (productId <= 0 || quantityPurchased <= 0)
            {
                return Json(new { success = false, message = "Invalid product ID or quantity." });
            }

            using (var db = new BotanifyContext())
            {
                var product = db.products_tbl.FirstOrDefault(p => p.productId == productId);

                if (product != null)
                {
                    product.numberPurchased += quantityPurchased;
                    db.SaveChanges();

                    return Json(new { success = true, message = "Number of items purchased updated successfully." });
                }
                else
                {
                    return Json(new { success = false, message = "Product not found." });
                }
            }
        }

        public JsonResult GetTopPurchasedProducts()
        {
            using (var db = new BotanifyContext())
            {
                var topProducts = (from p in db.products_tbl
                                   orderby p.numberPurchased descending
                                   select new
                                   {
                                       p.productName,
                                       p.numberPurchased
                                   })
                                  .Take(7)
                                  .ToList();

                return Json(topProducts, JsonRequestBehavior.AllowGet);
            }
        }




    }
}