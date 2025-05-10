const form = document.getElementById('empForm');
const payslipContainer = document.getElementById('payslipContainer');

// Paid Days Calculation
document.getElementById('workingDays').addEventListener('input', calcPaidDays);
document.getElementById('leaves').addEventListener('input', calcPaidDays);

function calcPaidDays() {
  document.getElementById('grossWages').value || 0;
  const wd = +document.getElementById('workingDays').value || 0;
  const lv = +document.getElementById('leaves').value || 0;
  document.getElementById('paidDays').value = wd - lv;
}

// Total Earnings & Deductions Calculation
function calcTotals() {
  const get = id => +document.getElementById(id).value || 0;
  const totalEarnings = get('basic') + get('hra') + get('conveyance') + get('medical') + get('otherAllowance');
  const totalDeductions = get('epf') + get('esi') + get('pt') + get('welfare') + get('advance');
  document.getElementById('totalEarningsInput').value = totalEarnings;
  document.getElementById('totalDeductionsInput').value = totalDeductions;
  document.getElementById('netSalaryInput').value = totalEarnings - totalDeductions;
}

['basic', 'hra', 'conveyance', 'medical', 'otherAllowance'].forEach(id => {
  document.getElementById(id).addEventListener('input', calcTotals);
});
['epf', 'esi', 'pt', 'welfare', 'advance'].forEach(id => {
  document.getElementById(id).addEventListener('input', calcTotals);
});

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const get = id => +document.getElementById(id).value || 0;
  const text = id => document.getElementById(id).value;

  const payMonth = document.getElementById('payMonth').value;
  const formattedMonth = new Date(payMonth).toLocaleString('default', { month: 'long', year: 'numeric' });

  const earnings = {
    basic: get('basic'),
    hra: get('hra'),
    conveyance: get('conveyance'),
    medical: get('medical'),
    other: get('otherAllowance'),
  };
  const deductions = {
    epf: get('epf'),
    esi: get('esi'),
    pt: get('pt'),
    welfare: get('welfare'),
    advance: get('advance'),
  };

const invoiceHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Source One - Payslip</title>
  <link href="assets/logo/SourceOnebg.png" rel="icon">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>
  <link rel="stylesheet" href="assets/style.css" type="text/css" media="all" />
  <style>

*,
::before,
::after {
  box-sizing: border-box;
  /* 1 */
  border-width: 0;
  /* 2 */
  border-style: solid;
  /* 2 */
  border-color: #e5e7eb;
  /* 2 */
}

::before,
::after {
  --tw-content: '';
}

html {
  line-height: 1.5;
  /* 1 */
  -webkit-text-size-adjust: 100%;
  /* 2 */
  -moz-tab-size: 4;
  /* 3 */
  tab-size: 4;
  /* 3 */
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  /* 4 */
  font-feature-settings: normal;
  /* 5 */
  font-variation-settings: normal;
  /* 6 */
}

body {
  margin: 0;
  /* 1 */
  line-height: inherit;
  /* 2 */
}

hr {
  height: 0;
  /* 1 */
  color: inherit;
  /* 2 */
  border-top-width: 1px;
  /* 3 */
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: inherit;
  font-weight: inherit;
}

/*
Reset links to optimize for opt-in styling instead of opt-out.
*/

a {
  color: inherit;
  text-decoration: inherit;
}

/*
Add the correct font weight in Edge and Safari.
*/

b,
strong {
  font-weight: bolder;
}



code,
kbd,
samp,
pre {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  /* 1 */
  font-size: 1em;
  /* 2 */
}

/*
Add the correct font size in all browsers.
*/

small {
  font-size: 80%;
}



sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

sub {
  bottom: -0.25em;
}

sup {
  top: -0.5em;
}



table {
  text-indent: 0;
  /* 1 */
  border-color: inherit;
  /* 2 */
  border-collapse: collapse;
  /* 3 */
}



button,
input,
optgroup,
select,
textarea {
  font-family: inherit;
  /* 1 */
  font-feature-settings: inherit;
  /* 1 */
  font-variation-settings: inherit;
  /* 1 */
  font-size: 100%;
  /* 1 */
  font-weight: inherit;
  /* 1 */
  line-height: inherit;
  /* 1 */
  color: inherit;
  /* 1 */
  margin: 0;
  /* 2 */
  padding: 0;
  /* 3 */
}



button,
select {
  text-transform: none;
}

button,
[type='button'],
[type='reset'],
[type='submit'] {
  -webkit-appearance: button;
  /* 1 */
  background-color: transparent;
  /* 2 */
  background-image: none;
  /* 2 */
}

/*
Use the modern Firefox focus style for all focusable elements.
*/

:-moz-focusring {
  outline: auto;
}



:-moz-ui-invalid {
  box-shadow: none;
}

/*
Add the correct vertical alignment in Chrome and Firefox.
*/

progress {
  vertical-align: baseline;
}

/*
Correct the cursor style of increment and decrement buttons in Safari.
*/

::-webkit-inner-spin-button,
::-webkit-outer-spin-button {
  height: auto;
}



[type='search'] {
  -webkit-appearance: textfield;
  /* 1 */
  outline-offset: -2px;
  /* 2 */
}

/*
Remove the inner padding in Chrome and Safari on macOS.
*/

::-webkit-search-decoration {
  -webkit-appearance: none;
}



::-webkit-file-upload-button {
  -webkit-appearance: button;
  /* 1 */
  font: inherit;
  /* 2 */
}



summary {
  display: list-item;
}



blockquote,
dl,
dd,
h1,
h2,
h3,
h4,
h5,
h6,
hr,
figure,
p,
pre {
  margin: 0;
}

fieldset {
  margin: 0;
  padding: 0;
}

legend {
  padding: 0;
}

ol,
ul,
menu {
  list-style: none;
  margin: 0;
  padding: 0;
}

/*
Reset default styling for dialogs.
*/

dialog {
  padding: 0;
}

/*
Prevent resizing textareas horizontally by default.
*/

textarea {
  resize: vertical;
}

/*
1. Reset the default placeholder opacity in Firefox. (https://github.com/tailwindlabs/tailwindcss/issues/3300)
2. Set the default placeholder color to the user's configured gray 400 color.
*/

input::placeholder,
textarea::placeholder {
  opacity: 1;
  /* 1 */
  color: #9ca3af;
  /* 2 */
}

/*
Set the default cursor for buttons.
*/

button,
[role="button"] {
  cursor: pointer;
}

/*
Make sure disabled buttons don't get the pointer cursor.
*/

:disabled {
  cursor: default;
}

img,
svg,
video,
canvas,
audio,
iframe,
embed,
object {
  display: block;
  /* 1 */
  vertical-align: middle;
  /* 2 */
}

/*
Constrain images and videos to the parent width and preserve their intrinsic aspect ratio. (https://github.com/mozdevs/cssremedy/issues/14)
*/

img,
video {
  max-width: 100%;
  height: auto;
}

/* Make elements with the HTML hidden attribute stay hidden by default */

[hidden] {
  display: none;
}

*, ::before, ::after{
  --tw-border-spacing-x: 0;
  --tw-border-spacing-y: 0;
  --tw-translate-x: 0;
  --tw-translate-y: 0;
  --tw-rotate: 0;
  --tw-skew-x: 0;
  --tw-skew-y: 0;
  --tw-scale-x: 1;
  --tw-scale-y: 1;
  --tw-pan-x:  ;
  --tw-pan-y:  ;
  --tw-pinch-zoom:  ;
  --tw-scroll-snap-strictness: proximity;
  --tw-gradient-from-position:  ;
  --tw-gradient-via-position:  ;
  --tw-gradient-to-position:  ;
  --tw-ordinal:  ;
  --tw-slashed-zero:  ;
  --tw-numeric-figure:  ;
  --tw-numeric-spacing:  ;
  --tw-numeric-fraction:  ;
  --tw-ring-inset:  ;
  --tw-ring-offset-width: 0px;
  --tw-ring-offset-color: #fff;
  --tw-ring-color: rgb(222,63,106);
  --tw-ring-offset-shadow: 0 0 #0000;
  --tw-ring-shadow: 0 0 #0000;
  --tw-shadow: 0 0 #0000;
  --tw-shadow-colored: 0 0 #0000;
  --tw-blur:  ;
  --tw-brightness:  ;
  --tw-contrast:  ;
  --tw-grayscale:  ;
  --tw-hue-rotate:  ;
  --tw-invert:  ;
  --tw-saturate:  ;
  --tw-sepia:  ;
  --tw-drop-shadow:  ;
  --tw-backdrop-blur:  ;
  --tw-backdrop-brightness:  ;
  --tw-backdrop-contrast:  ;
  --tw-backdrop-grayscale:  ;
  --tw-backdrop-hue-rotate:  ;
  --tw-backdrop-invert:  ;
  --tw-backdrop-opacity:  ;
  --tw-backdrop-saturate:  ;
  --tw-backdrop-sepia:  ;
}

::backdrop{
  --tw-border-spacing-x: 0;
  --tw-border-spacing-y: 0;
  --tw-translate-x: 0;
  --tw-translate-y: 0;
  --tw-rotate: 0;
  --tw-skew-x: 0;
  --tw-skew-y: 0;
  --tw-scale-x: 1;
  --tw-scale-y: 1;
  --tw-pan-x:  ;
  --tw-pan-y:  ;
  --tw-pinch-zoom:  ;
  --tw-scroll-snap-strictness: proximity;
  --tw-gradient-from-position:  ;
  --tw-gradient-via-position:  ;
  --tw-gradient-to-position:  ;
  --tw-ordinal:  ;
  --tw-slashed-zero:  ;
  --tw-numeric-figure:  ;
  --tw-numeric-spacing:  ;
  --tw-numeric-fraction:  ;
  --tw-ring-inset:  ;
  --tw-ring-offset-width: 0px;
  --tw-ring-offset-color: #fff;
  --tw-ring-color: rgb(222,63,106);
  --tw-ring-offset-shadow: 0 0 #0000;
  --tw-ring-shadow: 0 0 #0000;
  --tw-shadow: 0 0 #0000;
  --tw-shadow-colored: 0 0 #0000;
  --tw-blur:  ;
  --tw-brightness:  ;
  --tw-contrast:  ;
  --tw-grayscale:  ;
  --tw-hue-rotate:  ;
  --tw-invert:  ;
  --tw-saturate:  ;
  --tw-sepia:  ;
  --tw-drop-shadow:  ;
  --tw-backdrop-blur:  ;
  --tw-backdrop-brightness:  ;
  --tw-backdrop-contrast:  ;
  --tw-backdrop-grayscale:  ;
  --tw-backdrop-hue-rotate:  ;
  --tw-backdrop-invert:  ;
  --tw-backdrop-opacity:  ;
  --tw-backdrop-saturate:  ;
  --tw-backdrop-sepia:  ;
}

.fixed{
  position: fixed;
}

.bottom-0{
  bottom: 0px;
}

.left-0{
  left: 0px;
}

.table{
  display: table;
}

.h-12{
  height: 3rem;
}

.w-1\/2{
  width: 50%;
}

.w-full{
  width: 100%;
}

.border-collapse{
  border-collapse: collapse;
}

.border-spacing-0{
  --tw-border-spacing-x: 0px;
  --tw-border-spacing-y: 0px;
  border-spacing: var(--tw-border-spacing-x) var(--tw-border-spacing-y);
}

.whitespace-nowrap{
  white-space: nowrap;
}

.border-b{
  border-bottom-width: 1px;
}

.border-b-2{
  border-bottom-width: 2px;
}

.border-r{
  border-right-width: 1px;
}

.border-main{
  border-color: #de3f6a;
}

.bg-main{
  background-color: #de3f6a;
}

.bg-slate-100{
  background-color: #f8f2f6;
}

.p-3{
  padding: 0.75rem;
}

.px-14{
  padding-left: 3.5rem;
  padding-right: 3.5rem;
}

.px-2{
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}

.py-10{
  padding-top: 1.2rem;
  padding-bottom: 2.5rem;
}

.py-3{
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
}

.py-4{
  padding-top: 1rem;
  padding-bottom: 1rem;
}

.py-6{
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
}

.pb-3{
  padding-bottom: 0.75rem;
}

.pl-2{
  padding-left: 0.5rem;
}

.pl-3{
  padding-left: 0.75rem;
}

.pl-4{
  padding-left: 1rem;
}

.pr-3{
  padding-right: 0.75rem;
}

.pr-4{
  padding-right: 1rem;
}

.text-center{
  text-align: center;
}

.text-right{
  text-align: right;
}

.align-top{
  vertical-align: top;
}

.text-sm{
  font-size: 0.875rem;
  line-height: 1.25rem;
}

.text-xs{
  font-size: 0.75rem;
  line-height: 1rem;
}

.font-bold{
  font-weight: 700;
}

.italic{
  font-style: italic;
}

.text-main{
  color: rgb(222,63,106);
}

.text-neutral-600{
  color: #525252;
}

.text-neutral-700{
  color: #404040;
}

.text-slate-300{
  color: #cbd5e1;
}

.text-slate-400{
  color: #94a3b8;
}

.text-white{
  color: #fff;
}

@page {
  margin: 0;
}

@media print {
  body {
    -webkit-print-color-adjust: exact;
  }
}
  </style>
</head>
<body>
  <div class="payslip-container" id="payslip-container">
   <div class="py-4">
            <div class="px-14 py-6">
              <table class="w-full border-collapse border-spacing-0">
                <tbody>
                  <tr>
                    <td class="w-full align-top">
                      <div>
                        <img src="https://res.cloudinary.com/dtwcxssvj/image/upload/v1746523573/SourceOneLogo_ubsxye.png" class="h-12"  />
                      </div>
                    </td>
                    <td class="align-top">
                      <div class="text-sm">
                        <table class="border-collapse border-spacing-0">
                          <tbody>
                            <tr>
                              <td class="border-r pr-4">
                                <div>
                                  <p class="whitespace-nowrap text-slate-400 text-right">Pay Slip For </p>
                                  <p class="whitespace-nowrap font-bold text-main text-right" >${formattedMonth}</p>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
  
            <div class="bg-slate-100 px-14 py-6 text-sm">
              <table class="w-full border-collapse border-spacing-0">
                <tbody>
                  <tr>
                    <td class="w-1/2 align-top">
                      <div class="text-sm text-neutral-600">
                        <p class="font-bold">Employee Information</p>
                        <p>Employee ID &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : <span>${text('empId')}</span></p>
                        <p>Employee Name &nbsp; : <span>${text('empName')}</span></p>
                        <p>Designation&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : <span>${text('designation')}</span></p>
                        <p>Department&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : <span>${text('department')}</span></p>
                      </div>
                    </td>
                    <td class="w-1/2 align-top text-right">
                      <div class="text-sm text-neutral-600">
                        <p class="font-bold">Employee Bank</p>
                        <p>Bank Name: ${text('bankName')} </p>
                        <p>Bank Number: ${get('accNumber')}</p>
                        <p>IFSC Code : ${text('IFSC')}</p>
                        <p>Branch : ${text('Branch')}</p>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
  
            <div class="px-14 py-10 text-sm text-neutral-700">
              <table class="w-full border-collapse border-spacing-0">
                <thead>
                  <tr>
                    <td class="border-b-2 border-main pb-3 pl-3 font-bold text-main">Sl No</td>
                    <td class="border-b-2 border-main pb-3 pl-2 font-bold text-main">Description</td>
                    <td class="border-b-2 border-main pb-3 pl-2 text-right font-bold text-main">Amount</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="border-b py-3 pl-3">1.</td>
                    <td class="border-b py-3 pl-2">Gross Wages</td>
                    <td class="border-b py-3 pl-2 text-right">${get('grossWages')}</td>
                  </tr>
                  <tr>
                    <td class="border-b py-3 pl-3">2.</td>
                    <td class="border-b py-3 pl-2">Total Working Days</td>
                    <td class="border-b py-3 pl-2 text-right">${get('workingDays')}</td>
                  </tr>
                  <tr>
                    <td class="border-b py-3 pl-3">4.</td>
                    <td class="border-b py-3 pl-2">Leaves</td>
                    <td class="border-b py-3 pl-2 text-right">${get('leaves')}</td>
                  </tr>
                  <tr>
                    <td class="border-b py-3 pl-3">5.</td>
                    <td class="border-b py-3 pl-2">Paid Days</td>
                    <td class="border-b py-3 pl-2 text-right">${get('paidDays')}</td>
                  </tr>
                </tbody>
              </table>
            </div>
  
            <div class="px-14 py-10 text-sm text-neutral-700">
              <table class="w-full border-collapse border-spacing-0">
                <thead>
                  <tr>
                    <td class="border-b-2 border-main pb-3 pl-2 font-bold text-main">Earnings</td>
                    <td class="border-b-2 border-main pb-3 pl-2 text-right font-bold text-main">Amount</td>
                    <td class="border-b-2 border-main pb-3 pl-2 text-center font-bold text-main"></td>
                    <td class="border-b-2 border-main pb-3 pl-2 font-bold text-main">Deductions</td>
                    <td class="border-b-2 border-main pb-3 pl-2 text-right font-bold text-main">Amount</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="border-b py-3 pl-2">Basic</td>
                    <td class="border-b py-3 pl-2 text-right">${earnings.basic}</td>
                    <td class="border-b py-3 pl-2 text-center"></td>
                    <td class="border-b py-3 pl-2">EPF</td>
                    <td class="border-b py-3 pl-2 text-right">${deductions.epf}</td>
                  </tr>
                   <tr>
                <td class="border-b py-3 pl-2">HRA</td>
                <td class="border-b py-3 pl-2 text-right">${earnings.hra}</td>
                <td class="border-b py-3 pl-2 text-center"> </td>
                <td class="border-b py-3 pl-2">ESI</td>
                <td class="border-b py-3 pl-2 text-right">${deductions.esi}</td>
                
              </tr>
              <tr>
                <td class="border-b py-3 pl-2">Conveyance Allowance</td>
                <td class="border-b py-3 pl-2 text-right">${earnings.conveyance}</td>
                <td class="border-b py-3 pl-2 text-center"></td>
                <td class="border-b py-3 pl-2">Professional Tax</td>
                <td class="border-b py-3 pl-2 text-right">${deductions.pt}</td>
              </tr>
              <tr>
                <td class="border-b py-3 pl-2">Medical Allowance</td>
                <td class="border-b py-3 pl-2 text-right">${earnings.medical}</td>
                <td class="border-b py-3 pl-2 text-center"></td>
                <td class="border-b py-3 pl-2">Welfar Fond</td>
                <td class="border-b py-3 pl-2 text-right">${deductions.welfare}</td>
              </tr>
              <tr>
                <td class="border-b py-3 pl-2">Other Allowance</td>
                <td class="border-b py-3 pl-2 text-right">${earnings.other}</td>
                <td class="border-b py-3 pl-2 text-center"></td>
                <td class="border-b py-3 pl-2">Advance</td>
                <td class="border-b py-3 pl-2 text-right">${deductions.advance}</td>
              </tr>
                  <tr>
                    <td class="border-b py-3 pl-2 font-bold">[A] Total Earnings</td>
                    <td class="border-b py-3 pl-2 text-right font-bold">${get('totalEarningsInput')}</td>
                    <td class="border-b py-3 pl-2 text-center"></td>
                    <td class="border-b py-3 pl-2 font-bold">[B] Total Deductions</td>
                    <td class="border-b py-3 pl-2 text-right font-bold">${get('totalDeductionsInput')}</td>
                  </tr>
                  <tr>
                <td colspan="7">
                  <table class="w-full border-collapse border-spacing-0">
                    <tbody>
                      <tr>
                        <td class="w-full"></td>
                        <td>
                          <table class="w-full border-collapse border-spacing-0">
                            <tbody>
                              <tr>
                                <td class="p-3">
                                  <div class="whitespace-nowrap text-slate-400"></div>
                                </td>
                                <td class="p-3 text-right">
                                  <div class="whitespace-nowrap font-bold text-main"></div>
                                </td>
                              </tr>
                              <tr>
                                <td class="bg-main p-3">
                                  <div class="whitespace-nowrap font-bold text-white">[A] - [B] =  Net Salary :</div>
                                </td>
                                <td class="bg-main p-3 text-right">
                                  <div class="whitespace-nowrap font-bold text-white">${get('netSalaryInput')}</div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
                </tbody>
              </table>
            </div>
            <div class="px-14 py-10 text-sm text-neutral-700">
                <p class="text-main font-bold">Note:</p>
                <p class="italic">⚠️ This is a computer-generated document. Do not sign.</p>
                </div>
  </div>
  <script>
    window.onload = function () {
      const payslipElement = document.getElementById('payslip-container');
      const images = payslipElement.querySelectorAll('img');
      let loadedImages = 0;

      const generatePDF = () => {
        html2pdf()
          .set({
            html2canvas: {
              allowTaint: true,
              useCORS: true,
              logging: true
            }
          })
          .from(payslipElement)
          .save('${text('empName')}_${formattedMonth}_Payslip.pdf');
      };

      if (images.length === 0) {
        generatePDF();
      } else {
        images.forEach(img => {
          if (img.complete) {
            loadedImages++;
          } else {
            img.onload = img.onerror = () => {
              loadedImages++;
              if (loadedImages === images.length) {
                generatePDF();
              }
            };
          }
        });

        // Edge case: all were already loaded
        if (loadedImages === images.length) {
          generatePDF();
        }
      }
    };
  </script>
</body>
</html>

`
  const blob = new Blob([invoiceHTML], { type: 'text/html' });
  const blobUrl = URL.createObjectURL(blob);
  window.open(blobUrl, '_blank');
});