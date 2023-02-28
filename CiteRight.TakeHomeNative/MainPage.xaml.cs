using CiteRight.TakeHomeNative.ViewModels;

namespace CiteRight.TakeHomeNative;

public partial class MainPage : ContentPage
{
	public MainPage(DocViewModel viewModel)
	{
		InitializeComponent();
        BindingContext = viewModel;
    }
}

