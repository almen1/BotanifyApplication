using System;
using System.ComponentModel.DataAnnotations;

namespace BotanifyApplication.Controllers
{
    public class RegistrationDTO
    {
        public string fName { get; set; } = string.Empty;
        public string lName { get; set; } = string.Empty;
        public string uEmail { get; set; } = string.Empty;
        public string uPassword { get; set; } = string.Empty;
        public string uPhone { get; set; } = string.Empty;

        public string uAddress { get; set; } = string.Empty;
        public string uCity { get; set; } = string.Empty;
        public string uRegion { get; set; } = string.Empty;
        public string uPostal { get; set; } = string.Empty;


        public DateTime createAt { get; set; }
        public DateTime updateAt { get; set; }

    }
}