# Time Picker

## About
A simple JQuery based time selector.

## Dependencies:
 - JQuery ^v3.6.0
 - SASS Compiler (optional)

## Installation
1. Include JQuery in your project, either locally or from a CDN. i.e.
```
<head>
    ...
    
    // e.g. from a CDN 
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
```
2. Include the `timepicker.js` file in your project. Be sure to include the defer attribute if you place the script tag at the head of the document.
```
<head>
    ...
    ...
    <script src="{dir}/timepicker.js" defer></script>
```
3. Include the `timepicker.css` file in your styles directory. The `.scss` file that this stylesheet was generated from is included in the 'scss' directory.
```
<head>
    ...
    ...
    <link rel="stylesheet" href="{dir}/timepicker.css" />
```
4. The timepicker acts as an override for the browser's default, so you just need to call a time input from the HTML markup. i.e.
```
<body>
    ...
    <input type="time" />
    ...
</body>
```
5. Attributes
 - *Required:*
    - `type` = `"time"`
    - `name` = The name of the input
- *Optional:*
    - `value` = The default time to use, **hh:mm** format (defaults to 12:00)
    - `step` = The increments for the minutes dropdown (default 15 - i.e. user can select xx:00, xx:15, xx:30, xx:45)

## Todo
- [x] Refactor for multiple instances
- [ ] Build checks for valid inputs in 'value' & 'step' attributes
- [ ] Get step attribute to affect increments
- [ ] Alert user if no name attribute
- [ ] Write Readme