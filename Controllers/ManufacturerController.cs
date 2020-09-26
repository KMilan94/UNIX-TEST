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
    public class ManufacturerController : ControllerBase
    {
        private readonly UnixDbContext _context;

        public ManufacturerController(UnixDbContext context)
        {
            _context = context;
        }

        // GET: api/Manufacturer
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DbManufacturer>>> GetManufacturer()
        {
            return await _context.Manufacturer.ToListAsync();
        }

        // GET: api/Manufacturer/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DbManufacturer>> GetDbManufacturer(int id)
        {
            var dbManufacturer = await _context.Manufacturer.FindAsync(id);

            if (dbManufacturer == null)
            {
                return NotFound();
            }

            return dbManufacturer;
        }

        // PUT: api/Manufacturer/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDbManufacturer(int id, DbManufacturer dbManufacturer)
        {
            if (id != dbManufacturer.ID)
            {
                return BadRequest();
            }

            _context.Entry(dbManufacturer).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DbManufacturerExists(id))
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

        // POST: api/Manufacturer
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<DbManufacturer>> PostDbManufacturer(DbManufacturer dbManufacturer)
        {
            _context.Manufacturer.Add(dbManufacturer);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDbManufacturer", new { id = dbManufacturer.ID }, dbManufacturer);
        }

        // DELETE: api/Manufacturer/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<DbManufacturer>> DeleteDbManufacturer(int id)
        {
            var dbManufacturer = await _context.Manufacturer.FindAsync(id);
            if (dbManufacturer == null)
            {
                return NotFound();
            }

            _context.Manufacturer.Remove(dbManufacturer);
            await _context.SaveChangesAsync();

            return dbManufacturer;
        }

        private bool DbManufacturerExists(int id)
        {
            return _context.Manufacturer.Any(e => e.ID == id);
        }
    }
}
