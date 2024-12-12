using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Botanify.Models
{
    //DISREGARD TEST LANG TO
    public class BotanifyModel
    {
        [Key]
        public int testId { get; set; }
        public string fName { get; set; }
        public string lName { get; set; }
        public DateTime createAt { get; set; }
        public DateTime updateAt { get; set; }
    }
}