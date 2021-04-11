using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using OLeite.Models;
using OLeite.Servicos;

namespace OLeite.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UltimoNumeroAnimalController : ControllerBase
    {
        private readonly AnimaisServices _animaisServices;

        public UltimoNumeroAnimalController(AnimaisServices animalService)
        {
            _animaisServices = animalService;
        }

        [HttpGet]
        public ActionResult<long> Get()
        {
            List<Animal> animais = _animaisServices.Get();
            long ultimoNumero = 0L;
            foreach(Animal animal in animais) {
                if (animal.numero > ultimoNumero) {
                    ultimoNumero = animal.numero;
                }
            }
            return ultimoNumero;
        }
    }
}
