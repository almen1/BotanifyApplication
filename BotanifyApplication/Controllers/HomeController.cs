﻿using Botanify.Models;
using BotanifyApplication.Models;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Runtime.Remoting.Messaging;
using System.Web;
using System.Web.Mvc;

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

        public ActionResult DashProducts()
        {
            return View();
        }

        public void RegisterUser(RegistrationDTO registrationData)
        {
            using (var db = new BotanifyContext())
            {
                var regData = new users_tblModel()
                {
                    userId = 1,
                    firstName = registrationData.fName.ToString(),
                    lastName = registrationData.lName.ToString(),
                    //addressId = ADD SOON
                    userEmail = registrationData.uEmail.ToString(),
                    userPassword = registrationData.uPassword.ToString(),
                    createAt = DateTime.Now,
                    updateAt = DateTime.Now
                };

                db.users_tbl.Add(regData);
                db.SaveChanges();
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
                                     sData.size
                                 }).ToList();

                var categoriesData = (from cData in db.categories_tbl
                                      select new
                                      {
                                          cData.categoryName
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
                // Check if the product exists first
                var itemData = (from pData in db.products_tbl
                                where pData.productId == productId
                                select pData).FirstOrDefault();

                if (itemData != null)
                {
                    // Now delete the product from the products_tbl using raw SQL
                    var sql = "DELETE FROM products_tbl WHERE productId = @productId";

                    // Using MySqlParameter for MySQL database
                    db.Database.ExecuteSqlCommand(sql, new MySqlParameter("@productId", productId));

                    // Optionally, save changes if necessary (though ExecuteSqlRaw does it for us)
                    db.SaveChanges();

                    return Json(new { success = true, message = "Product deleted successfully." }, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json(new { success = false, message = "Product not found." }, JsonRequestBehavior.AllowGet);
                }
            }
        }


    }
}