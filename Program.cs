
using System.Diagnostics;
using System.Globalization;
using System.Threading.Channels;
using Microsoft.AspNetCore.Hosting.StaticWebAssets;
using Microsoft.AspNetCore.StaticFiles;


public class ReaderApp
{




    public static WebApplication configureApp(params string[] args)
    {

        var MyAllowSpecificOrigins = "_myAllowSpecificOrigins"; //this is just the cors policy name i am to lazy to change it from the microsoft article example name lolololol.....
        var builder = WebApplication.CreateBuilder(args);
        builder.Services.AddCors(); //here we add the service
        builder.Services.AddControllers(); //here we add support for controlls
        app = builder.Build();
        app.UseHttpsRedirection(); //this is for Https kinda important... you dont wanna be running that old dirty http stuff nowdays
        app.UseCors(MyAllowSpecificOrigins); //here we set our policy we can specify other domains we want to be allowed to access like if we wated to allow access to another server here on another domain
        app.UseStaticFiles(
        new StaticFileOptions { ServeUnknownFileTypes = true }  /*
                                                        this allows us to use a wwwroot folder where we server our static files from.
                                                        "ServeUnknownFileTypes= true"  is a bit of a dirty hack for
                                                        now its just to allow use to see the sourcemap for our TSX files.. this should not be used for deployment.. 
                                                        because we are basically listing everything including the kitchen sink here...*/
        );
        app.MapDefaultControllerRoute();    //well the name says it all


        var provider = new FileExtensionContentTypeProvider();
        provider.Mappings[".tsx"] = "application/x-typescript";
        app.UseStaticFiles(new StaticFileOptions()
        {
            ContentTypeProvider = provider
        });


        app.MapControllers();   //maps our controllers...
        return app;
    }


    private static event EventHandler windowClosed;
    private static Thread guiThread;
    private static WebApplication app;

    private static void onWindowClosed(object sender, EventArgs eventArgs){
        Environment.Exit(0);
    }

    public static void Main()
    {


        windowClosed += new EventHandler(onWindowClosed);

        try
        {
            var app = ReaderApp.configureApp();
            guiThread = new Thread(() =>
            {
                using (Process process = new Process())
                {
                    process.StartInfo = new ProcessStartInfo("/usr/bin/flatpak", $@" run --branch=stable --arch=x86_64 --command=/app/bin/edge --file-forwarding com.microsoft.Edge --new-window --app=http://localhost:5000/#home")
                    {
                        UseShellExecute = false, //Import in Linux environments
                        CreateNoWindow = true,
                        RedirectStandardOutput = true,

                    };
           
                    process.Start();
                    Console.WriteLine(process.StandardOutput.ReadToEnd());
                    process.WaitForExit();
                    onWindowClosed("", new EventArgs());
                }
            });

       

            guiThread.Name = "Omnicatz speech reader gui";
           
       


            guiThread.Start();
            app.Run("http://localhost:5000");
         

          
        


        }
        catch (ApplicationException ex)
        {

        }


    }


}