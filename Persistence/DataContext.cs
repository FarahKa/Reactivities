using System;
using Domain;
using Microsoft.EntityFrameworkCore;



namespace Persistence
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
            
        }

        public DbSet<Value> Values {get; set;} 

        public DbSet<Activity> Activities { get; set; }


        //seeding the database
        protected override  void OnModelCreating(ModelBuilder builder){
            builder.Entity<Value>()
            .HasData(
                new Value{Id=1, Name="Value 1O1"},
                new Value{Id=2, Name="Value 1O2"},
                new Value{Id=3, Name="Value 1O3"}

            );
        }
        
    }
}