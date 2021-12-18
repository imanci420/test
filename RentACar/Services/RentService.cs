using Microsoft.EntityFrameworkCore;
using RentACar.DataAccess;
using RentACar.Interfaces;
using RentACar.Models;
using System;
using System.Threading.Tasks;

namespace RentACar.Services
{
    public class RentService : IRentService
    {
        private readonly RentACarDBContext context;
        public RentService(RentACarDBContext context)
        {
            this.context = context;
        }
        public async Task RentACar(Rent rent)
        {
            var price = context.Cars
                .SingleOrDefaultAsync(c => c.Id == rent.CarId)
                .Result
                .PricePerHour;

            rent.RentCost = Convert.ToDecimal(rent.RentTime.Subtract(DateTime.Now).TotalHours) * price;
            await context.Rents.AddAsync(rent);
            await context.SaveChangesAsync();
        }
    }
}
