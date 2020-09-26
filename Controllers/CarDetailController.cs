using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Unix.Database;
using Unix.Database.DbModels;

namespace Unix.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarDetailController : ControllerBase
    {
        private readonly UnixDbContext _context;

        public CarDetailController(UnixDbContext context)
        {
            _context = context;
        }

        // GET: api/CarDetail
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DbCarDetail>>> GetCarDetail()
        {
            return await _context.CarDetail.ToListAsync();
        }

        // GET: api/CarDetail/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DbCarDetail>> GetDbCarDetail(int id)
        {
            var dbCarDetail = await _context.CarDetail.FindAsync(id);

            if (dbCarDetail == null)
            {
                return NotFound();
            }

            return dbCarDetail;
        }

        // PUT: api/CarDetail/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDbCarDetail(int id, DbCarDetail dbCarDetail)
        {
            if (id != dbCarDetail.ID)
            {
                return BadRequest();
            }

            _context.Entry(dbCarDetail).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DbCarDetailExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/CarDetail
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<DbCarDetail>> PostDbCarDetail(DbCarDetail dbCarDetail)
        {
            _context.CarDetail.Add(dbCarDetail);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDbCarDetail", new { id = dbCarDetail.ID }, dbCarDetail);
        }

        // DELETE: api/CarDetail/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<DbCarDetail>> DeleteDbCarDetail(int id)
        {
            var dbCarDetail = await _context.CarDetail.FindAsync(id);
            if (dbCarDetail == null)
            {
                return NotFound();
            }

            _context.CarDetail.Remove(dbCarDetail);
            await _context.SaveChangesAsync();

            return dbCarDetail;
        }

        private bool DbCarDetailExists(int id)
        {
            return _context.CarDetail.Any(e => e.ID == id);
        }
    }
}
