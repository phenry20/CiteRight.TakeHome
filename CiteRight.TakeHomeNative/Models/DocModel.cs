using System;
using System.ComponentModel;

namespace CiteRight.TakeHomeNative.Models
{
    public class DocModel : INotifyPropertyChanged
    {
        private string text;
        public string Text
        {
            get { return text; }
            set
            {
                text = value;
                OnPropertyChange(nameof(Text));
            }
        }
        public event PropertyChangedEventHandler PropertyChanged;

        public DocModel(string initialText)
        {
            this.Text = initialText;
        }

        
        public void OnPropertyChange(string propName)
        {
            if (PropertyChanged != null)
            {
                PropertyChanged(this, new PropertyChangedEventArgs(propName));
            }
        }
    }
}

