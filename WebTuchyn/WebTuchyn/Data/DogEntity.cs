using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebTuchyn.Data;

[Table("tblDogs")]
public class DogEntity
{
    [Key]
    public int Id { get; set; }
    [Required, StringLength(255)]
    public string Name { get; set; } = string.Empty;
    [StringLength(512)]
    public string Image { get; set; } = string.Empty;
}
