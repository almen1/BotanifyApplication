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

        public void AddUser(BotanyModel registrationData)
        {
            using (var db = new BotanifyContext())
            {
                var empData = new users_tblModel()
                {
                    userId = 1,
                    firstName = registrationData.fName.ToString(),
                    lastName = registrationData.lName.ToString(),
                    userEmail = registrationData.uEmail.ToString(),
                    userPassword = registrationData.uPassword.ToString(),
                    createAt = DateTime.Now,
                    updateAt = DateTime.Now
                };

                db.users_tbl.Add(empData);
                db.SaveChanges();
            }

            }
        }
    }