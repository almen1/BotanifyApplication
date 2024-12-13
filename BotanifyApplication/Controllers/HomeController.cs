using Botanify.Models;
using BotanifyApplication.Models;
using System;
using System.Collections.Generic;
using System.Linq;
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



    }
}