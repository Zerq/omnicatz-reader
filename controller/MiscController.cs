using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using VersOne.Epub;

namespace RadicalSimplicity.controller;

public class MiscController : Controller
{
    [HttpGet("/")]
    public FileResult index()
    {



        return File("index.html", "text/html");
    }

    [HttpGet("/filebrowse_home")]
    public SimpleDirectory ListDir()
    {
        return ListDir(Environment.GetFolderPath(Environment.SpecialFolder.UserProfile));
    }

    [HttpGet("/filebrowse/{path}")]
    public SimpleDirectory ListDir(string path)
    {
        path = Uri.UnescapeDataString(path);


        if (!Path.Exists(path))
        {
            throw new ApplicationException($@"invalid path could not load! ""{path}""");
        }

        return this.makeDir(new DirectoryInfo(path));
    }

    private SimpleDirectory makeDir(DirectoryInfo dir)
    {
        var x = dir.GetDirectories();

        var resultDir = new SimpleDirectory()
        {
            FullName = dir.FullName,
            Parent = dir.Parent?.FullName ?? null,
            Files = dir.GetFiles().Where(n => (n.Extension) == ".epub").Select(n => new SimpleFile() { Name = n.Name, FullName = n.FullName, Extension = n.Extension }).ToList(),
            Directories = dir.GetDirectories().Select(n => new SimpleDirectory() { Name = n.Name, FullName = n.FullName }).ToList()
        };

        return resultDir;
    }


    [HttpGet("/read-content")]
    public async Task<dynamic> Load(string path)
    {

        EpubBook book = await EpubReader.ReadBookAsync(path);
        return new
        {
            book.Title,
            book.Description,
            book.Author,
            book.Navigation,
            Reading = book.ReadingOrder
        };    //new {book.Title, book.Description, book.Author, content = book.Content};
    }
}
public class SimpleFile
{
    public string? Name { get; set; }
    public string? FullName { get; set; }
    public string? Extension { get; set; }
}

public class SimpleDirectory
{
    public string? Name { get; set; }
    public string? FullName { get; set; }
    public string? Parent { get; set; }
    public List<SimpleFile> Files { get; set; } = new List<SimpleFile>();
    public List<SimpleDirectory> Directories { get; set; } = new List<SimpleDirectory>();
}