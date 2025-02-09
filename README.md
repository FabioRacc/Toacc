# Toacc - Lightweight Toast Notification Library

Toacc is a lightweight and customizable JavaScript library for displaying toast notifications.

## Features

- Customizable toast position, duration, and appearance.
- Supports different types of toasts (info, success, warning, error).
- Auto-close functionality with optional hover stop.
- Option to include icons and close buttons.
- Custom styling and background colors.
- Callback function support for click events.

## Installation

Toacc is a standalone JavaScript library expect for FontAwesome for the icon.
You can include it in your project by downloading the script or linking it directly.

### Manual Download

1. Download the library and include it in your project.
2. Add the script in your HTML file:

```html
<script type="text/javascript" src="path/to/toacc.min.js"></script>
```

3. Add the style file in your HTML file:

```html
<link  rel="stylesheet" type="text/css" src="path/to/toacc.min.css">
```

## Usage

### Creating a Toacc Instance
If you need to create multiple toasts, you can create an instance to set options in the constructor, and these options will apply to all toasts created from that instance.

```javascript
const toast = new Toacc({
	position: "top-right",
	duration: 5000,
	auto_close: true,
	use_icons: true,
	close_button: true,
	stopOnHover: true,
	custom_class: "my-toast-class",
	custom_bg_color: "#ffcc00",
	custom_icon: "fa-solid fa-bell",
	onClick: () => alert("Toast clicked!"),
});
```

### Showing a Toast

```javascript
toast.show({
	message: "This is a success message!",
	type: "success",
});
```

### Using the Static Method
If you need to show only one toast you can use the static method.
```javascript
Toacc.show({
	message: "Hello, world!",
	type: "info",
	duration: 3000,
});
```

## Options

The `Toacc` constructor accepts an options object:
| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `position` | string | "top-right" | The position of the toast (`top-left`, `top-center`, `top-right`, `center-left`, `center`, `center-right`, `bottom-left`, `bottom-center`, `bottom-right`). |
| `duration` | number | 4000 | Duration before the toast closes automatically (in ms). |
| `auto_close` | boolean | true | Whether the toast should close automatically. |
| `use_icons` | boolean | true | Whether to use icons in the toast. |
| `close_button` | boolean | false | Whether to include a close button. |
| `stopOnHover` | boolean | false | Stops auto-close on hover. |
| `custom_class` | string | null | Custom CSS class for styling. |
| `custom_bg_color` | string | null | Custom background color. |
| `custom_icon` | string | null | Custom icon classes (FontAwesome, Material Icons, etc.). |
| `onClick` | function | null | Callback function executed when the toast is clicked. |

The `Toacc` show method accepts an options object with all previous options that override constructor options, in addition to two further options:
| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `type` | string | "info" | Toast type defines the color and icon (`info`, `success`, `warning`, `error`). |
| `message` | string |  | The message of the toast, can be HTML. |

## License

This project is licensed under the MIT License.

## Author

Developed by FabioRacc. Contributions are welcome!
