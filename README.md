# Zephyr
A totally different CSS framework striving to achieve elegance and efficiency by using custom HTML tags with predefined CSS and JS instead of classes. It is highly customizable, allowing for CSS properties to be used as HTML attributes. Has dark-mode built in. Heavily in development.

<br>

## Integrating
There are numerous ways to integrate Zephyr into your projects.
<hr>

1. With npm:

```sh
npm i zephyrfw
```
```html
<link rel="stylesheet" href="node_modules/zephyrfw/zephyr.min.css">
<!-- and -->
<script src="node_modules/zephyrfw/zephyr.min.js"></script>
```
<hr>

2. With CDN
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/zephyrfw/zephyr.min.css">
<!-- and -->
<script src="https://cdn.jsdelivr.net/npm/zephyrfw/zephyr.min.js"></script>
```
<hr>
3. Clone or manual download

<br>

## Usage
Use HTML as you normally would. To use the custom tags, prefix your tags by `z`.
<hr>

Here's an example of a custom `<a>` tag:

```html
<za href="https://somewhere.com">Example</za>
```

You can also use `CSS` rules in `HTML` attributes:

```html
<zbody font-family="Euclid Circular B Bold"></zbody>
```

You can customize the preset colors by using the <zconfig> tag:

```html
<!-- if information is omitted, it will be set to default -->
<zconfig $darkColor="#4a94fa"></zconfig>

<!-- these are the variable names and their defaults -->
$darkcolor = "#4a94fa"
$lightcolor = "#990099"
$darkbgcolor = "#000000"
$lightbgcolor = "#ffffff"
```

Lastly, there are many built-in tags ready to be used at any time:

```html
<!-- this will generate a loader that will wait until the whole window loads and 
will wait 2000ms after doing so before disapearing and letting everything appear -->
<zloader waitFor="windowLoad" delay="2000"></zloader> 

<!-- this will create a dark mode button with a pointer cursor. clicking on it
will switch between the theme colors previously defined in <zconfig> --> 
<zdark cursor="pointer"></zdark>
```

There is currently a limited number of tags and the design itself has not reached its prime.

You can check out https://dxxxxy.github.io/Zephyr/ or the `index.html` file included in the project as a reference. `Documentation` in progress at: https://dxxxxy.github.io/Zephyr/docs