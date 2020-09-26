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
    public class CarController : ControllerBase
    {
        private readonly UnixDbContext _context;

        public CarController(UnixDbContext context)
        {
            _context = context;
        }

        // GET: api/Car
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DbCar>>> GetCar()
        {
            return await _context.Car.ToListAsync();
        }

        // GET: api/Car/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DbCar>> GetDbCar(int id)
        {
            var dbCar = await _context.Car.FindAsync(id);

            if (dbCar == null)
            {
                return NotFound();
            }

            return dbCar;
        }

        // PUT: api/Car/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDbCar(int id, DbCar dbCar)
        {
            if (id != dbCar.ID)
            {
                return BadRequest();
            }

            _context.Entry(dbCar).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DbCarExists(id))
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

        // POST: api/Car
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<DbCar>> PostDbCar(DbCar dbCar)
        {
            _context.Car.Add(dbCar);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDbCar", new { id = dbCar.ID }, dbCar);
        }

        // DELETE: api/Car/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<DbCar>> DeleteDbCar(int id)
        {
            var dbCar = await _context.Car.FindAsync(id);
            if (dbCar == null)
            {
                return NotFound();
            }

            _context.Car.Remove(dbCar);
            await _context.SaveChangesAsync();

            return dbCar;
        }

        private bool DbCarExists(int id)
        {
            return _context.Car.Any(e => e.ID == id);
        }
    }
}
