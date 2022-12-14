using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Text.RegularExpressions;

namespace HospitalServer.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class Alarm : ControllerBase
    {
        // GET method to return JSON string
        [HttpGet(Name = "GetAlarm")]
        public string Get()
        {
            var httpClient = new HttpClient();
            var url = "http://hci3choi.dothome.co.kr/sql2json_alarm.php";
            var request = new HttpRequestMessage(HttpMethod.Get, url);
            var response = httpClient.Send(request);
            var reader = new StreamReader(response.Content.ReadAsStream());
            var html = reader.ReadToEnd();

            var options = RegexOptions.Multiline;
            var regex = new Regex(@"[a-zA-Z_]*\(|\)", options);
            string s = regex.Replace(html, "");
            s = s.ReadSlashedString();

            var json = JsonConvert.SerializeObject(s);
            return s;
        }
    }
}
