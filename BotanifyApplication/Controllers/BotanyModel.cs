using System;
using System.ComponentModel.DataAnnotations;

namespace BotanifyApplication.Controllers
{
    public class BotanyModel
    {
        public int testId { get; set; }
        public string fName { get; set; } = string.Empty;
        public string lName { get; set; } = string.Empty;
        public string uEmail { get; set; } = string.Empty;
        public string uPassword { get; set; } = string.Empty;
        public DateTime createAt { get; set; }
        public DateTime updateAt { get; set; }

    }
}