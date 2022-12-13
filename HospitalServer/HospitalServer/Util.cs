using System.Text;

namespace HospitalServer
{
    public static class Util
    {
        public static string ReadSlashedString(this string str)
        {
            var reader = new StringReader(str);
            var sb = new StringBuilder(32);
            bool q = false;
            while (true)
            {
                int chrR = reader.Read();

                if (chrR == -1) break;
                var chr = (char)chrR;

                if (!q)
                {
                    if (chr == '\\')
                    {
                        q = true;
                        continue;
                    }
                    sb.Append(chr);
                }
                else
                {
                    switch (chr)
                    {
                        case 'u':
                        case 'U':
                            var hexb = new char[4];
                            reader.Read(hexb, 0, 4);
                            chr = (char)Convert.ToInt32(new string(hexb), 16);
                            sb.Append(chr);
                            break;
                        default:
                            throw new Exception("Invalid backslash escape (\\ + charcode " + (int)chr + ")");
                    }
                    q = false;
                }
            }
            return sb.ToString();
        }
    }
}
