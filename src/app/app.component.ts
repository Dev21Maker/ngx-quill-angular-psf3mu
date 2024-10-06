import { Component, ElementRef } from '@angular/core';
import 'quill-mention';
import 'quill-emoji';
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  htmlText = '<p>Testing</p>';
  hasFocus = false;
  subject: string;

  atValues = [
    { id: 1, value: 'Fredrik Sundqvist', link: 'https://google.com' },
    { id: 2, value: 'Patrik Sjölin' },
  ];
  hashValues = [
    { id: 3, value: 'Fredrik Sundqvist 2' },
    { id: 4, value: 'Patrik Sjölin 2' },
  ];

  quillConfig = {
    //toolbar: '.toolbar',
    toolbar: {
      container: [
        ['italic', 'underline', 'strike'], // toggled buttons
        ['code-block'],
        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: 'ordered' }, { list: 'bullet' }],
        //[{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
        //[{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
        //[{ 'direction': 'rtl' }],                         // text direction

        //[{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        //[{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        //[{ 'font': [] }],
        //[{ 'align': [] }],

        ['charbtn'],
        ['clean'], // remove formatting button

        ['link'],
        ['csbtn'],
        ['link', 'image', 'video'],
      ],
      handlers: {
        csbtn: function () {
          let range = this.quill.getSelection();
          // if (range > 0) {
          this.quill.formatText(range.index, range.length, {
            size: 'large',
          });
          this.quill.formatLine(range.index, range.length, {
            align: 'center',
          });
          // }
        },
      },
    },

    mention: {
      allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
      mentionDenotationChars: ['@', '#'],
      source: (searchTerm, renderList, mentionChar) => {
        let values;

        if (mentionChar === '@') {
          values = this.atValues;
        } else {
          values = this.hashValues;
        }

        if (searchTerm.length === 0) {
          renderList(values, searchTerm);
        } else {
          const matches = [];
          for (var i = 0; i < values.length; i++)
            if (
              ~values[i].value.toLowerCase().indexOf(searchTerm.toLowerCase())
            )
              matches.push(values[i]);
          renderList(matches, searchTerm);
        }
      },
    },
    'emoji-toolbar': true,
    'emoji-textarea': false,
    'emoji-shortname': true,
    keyboard: {
      bindings: {
        // shiftEnter: {
        //   key: 13,
        //   shiftKey: true,
        //   handler: (range, context) => {
        //     // Handle shift+enter
        //     console.log("shift+enter")
        //   }
        // },
        enter: {
          key: 13,
          handler: (range, context) => {
            console.log('enter');
            return true;
          },
        },
      },
    },
  };

  // use ElementRef for overriding html
  constructor(private elem: ElementRef) {}

  onSelectionChanged = (event) => {
    if (event.oldRange == null) {
      this.onFocus();
    }
    if (event.range == null) {
      this.onBlur();
    }
  };

  onContentChanged = (event) => {
    //console.log(event.html);
  };

  // use this to change button title
  ngAfterViewInit() {
    // Update your dropdown with labels
    let placeholderPickerItems =
      this.elem.nativeElement.querySelectorAll('.ql-csbtn ');

    this.elem.nativeElement.querySelector('.ql-csbtn').innerHTML = 'BTN';
  }

  onFocus = () => {
    console.log('On Focus');
  };
  onBlur = () => {
    console.log('Blurred');
  };
}
