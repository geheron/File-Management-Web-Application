using ControllerLibrary.ControllerInterface;
using Data.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Serialization;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using WebApplication1.Data;
using WebApplication1.Models;
using ControllerLibrary.Controllers;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MainController : ControllerBase
    {
        private ApplicationDbContext _db;
        private IFileMethods _file;
        private IUserMethods _user;
        private readonly IConfiguration _configuration;
        private readonly ILogger<MainController> _logger;
        

        public MainController(IConfiguration configuration, ApplicationDbContext db, IFileMethods file, IUserMethods user, ILogger<MainController> logger)
        {
            this._configuration = configuration;
            this._db = db;
            this._file = file;
            this._user = user;
            _logger = logger;
            _logger.LogDebug("Nlog is integrated to Main Controller");
            
        }

        [HttpPost("AdminRegistration")]
        public async Task<ActionResult<User>> RegisterAdmin(SignUp request)
        {
            _logger.LogDebug("Admin registration called");
            return await _user.RegisterAdmin(request, _db);
        }

        [HttpPost("UserRegistration")]
        public async Task<ActionResult<User>> RegisterUser(SignUp request)
        {
            _logger.LogDebug("User registration called");
            return await _user.RegisterUser(request, _db);
        }

        [HttpPost("login")]
        public async Task<ActionResult<string>> Login(Login request)
        {
            return await _user.Login(request, _db, _configuration);
        }

        [HttpGet("ShowProfile")]
        [Authorize(Roles = "Admin,User")]
        public async Task<ActionResult<Profile>> ShowProfile()
        {
            var currUser = GetCurrentUserIdFromJWT();
            return await _user.ShowProfile(_db, currUser);
        }

        [HttpGet("ShowProfileById")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<Profile>> ShowProfileById(int userId)
        {
            return await _user.ShowProfile(_db, userId);
        }

        [HttpGet("GetAllUsers")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<IEnumerable<Profile>>> GetAllUsers()
        {
            var currUser = GetCurrentUserIdFromJWT();
            return await _user.GetAllUsers(_db, currUser);
        }

        [HttpDelete("DeleteUser")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteUser(int userId)
        {
            var currUser = GetCurrentUserIdFromJWT();
            return await _user.DeleteUser(_db, userId, currUser);
        }

        private static Profile UserToProfile(User user)
        {
            return new Profile
            {
                UserId = user.UserId,
                Username = user.Username,
                //Password = decodedPassword,
                Role = user.Role,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Address = user.Address,
                PhoneNumber = user.PhoneNumber
            };
        }

        


        private int GetCurrentUserIdFromJWT()
        {
            // Get the current user principal from the HttpContext
            var user = User;

            // Check if user is authenticated
            if (!user.Identity.IsAuthenticated)
            {
                throw new UnauthorizedAccessException("User is not authorized");
            }

            // Extract the user ID from the claim
            var userIdClaim = user.FindFirst("userId");
            if (userIdClaim == null)
            {
                throw new UnauthorizedAccessException("Missing user ID claim in JWT");
            }

            return int.Parse(userIdClaim.Value);
        }
        


        /*
         * File operations start here
         * UploadFile
         * GetAllFiles
         * GetMyFiles
         * DownloadFile
         * DeleteFile
         * 
         */
        [HttpPost("UploadFile")]
        [Authorize(Roles = "Admin,User")]
        public async Task<IActionResult> UploadFile(FileDTO fileDTO)
        {
            var currUser = GetCurrentUserIdFromJWT();
            return await _file.UploadFile(fileDTO, _db, currUser);
        }

        [HttpGet("GetAllFiles")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<IEnumerable<FileDisplayDTO>>> GetFiles()
        {
            var currUser = GetCurrentUserIdFromJWT();
            return await _file.GetFiles(_db, currUser);
        }

        [HttpGet("GetMyFiles")]
        [Authorize(Roles = "User")]
        public async Task<ActionResult<IEnumerable<FileDisplayDTO>>> GetMyFiles()
        {
            var currUser = GetCurrentUserIdFromJWT();
            return await _file.GetMyFiles(_db, currUser);
        }

        
        [HttpGet("DownloadFile")]
        [Authorize(Roles = "Admin, User")]
        public async Task<IActionResult> DownloadFile(int fileId)
        {
            var currUser = GetCurrentUserIdFromJWT();
            return await _file.DownloadFile(fileId, _db, currUser);
        }

        [HttpDelete("DeleteFile")]
        [Authorize(Roles = "Admin, User")]
        public async Task<IActionResult> DeleteFile(int fileId)
        {
            var currUser = GetCurrentUserIdFromJWT();
            return await _file.DeleteFile(fileId, _db, currUser);
        }
        
    }
}
