using CiteRight.TakeHomeNative.Helpers;
using Microsoft.Extensions.Logging;

namespace CiteRight.TakeHomeNative;

public static class MauiProgram
{
	public static MauiApp CreateMauiApp()
	{
		var builder = MauiApp.CreateBuilder();
		builder
			.UseMauiApp<App>()
			.ConfigureFonts(fonts =>
			{
				fonts.AddFont("OpenSans-Regular.ttf", "OpenSansRegular");
				fonts.AddFont("OpenSans-Semibold.ttf", "OpenSansSemibold");
			});


        const string SUPABASE_URL = "https://ldtfrwppvqpsdydwieem.supabase.co";
        const string SUPABASE_KEY =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkdGZyd3BwdnFwc2R5ZHdpZWVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzc1MTMyOTQsImV4cCI6MTk5MzA4OTI5NH0.fBEJvKs4rh14RSIpGMfWeKsKRrq2EhojeZyEUEyp9Fw";

        var client = new Supabase.Client(SUPABASE_URL, SUPABASE_KEY);
		AsyncHelper.RunSync(() =>  client.InitializeAsync());
		AsyncHelper.RunSync(() => client.Realtime.ConnectAsync());

        builder.Services.AddSingleton<Supabase.Client>(client);
        builder.Services.AddTransient<ViewModels.DocViewModel>();
		builder.Services.AddTransient<MainPage>();


#if DEBUG
		builder.Logging.AddDebug();
#endif

		return builder.Build();
	}
}
