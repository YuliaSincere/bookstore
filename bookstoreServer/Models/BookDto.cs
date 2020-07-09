/// <summary>
/// Транспортный класс для передачи информации о книге (количестве, остатке) для передачи на клиент.
/// </summary>
public class BookDto
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public double Price { get; set; }
    public int Count { get; set; }
    public string Image { get; set; }
    public string Author { get; set; }
}

