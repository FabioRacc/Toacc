class Toacc {
	/**
	 * Initializes the Toacc instance with default and user-provided options.
	 *
	 * @param {Object} [options={}] - Optional configuration object.
	 * @param {string} [options.position="top-right"] - The position of the toast container.
	 * @param {number} [options.duration=4000] - The duration before the toast closes automatically.
	 * @param {boolean} [options.auto_close=true] - Whether the toast should close automatically.
	 * @param {boolean} [options.use_icons=true] - Whether to use icons in the toast.
	 * @param {boolean} [options.close_button=false] - Whether to include a close button in the toast.
	 * @param {boolean} [options.stopOnHover=false] - Whether to stop the auto-close on hover.
	 * @param {string|null} [options.custom_class=null] - Custom classes to add to the toast.
	 * @param {string|null} [options.custom_bg_color=null] - Custom background color for the toast.
	 * @param {string|null} [options.custom_icon=null] - Custom icon classes for the toast.
	 * @param {Function|null} [options.onClick=null] - Callback function for click events on the toast.
	 */
	constructor(options = {}) {
		this.options = {
			position: "top-right",
			duration: 4000,
			auto_close: true,
			use_icons: false,
			close_button: false,
			stopOnHover: false,
			custom_class: null,
			custom_bg_color: null,
			custom_icon: null,
			onClick: null,
			...options,
		};
		this.classes = {
			container: "toacc__container",
			toast: "toacc__toast",
		};
		this.container = null;
	}

	/**
	 * Shows a toast with the given options.
	 *
	 * @param {string} message - The message to display in the toast.
	 * @param {Object} [param_toast_options={}] - Optional configuration object.
	 * @param {string} [param_toast_options.type="info"] - The type of the toast (info, success, warning, error).
	 * @param {string} [param_toast_options.position] - The position of the toast container.
	 * @param {number} [param_toast_options.duration] - The duration before the toast closes automatically.
	 * @param {boolean} [param_toast_options.auto_close] - Whether the toast should close automatically.
	 * @param {boolean} [param_toast_options.use_icons] - Whether to use icons in the toast.
	 * @param {boolean} [param_toast_options.close_button] - Whether to include a close button in the toast.
	 * @param {boolean} [param_toast_options.stopOnHover] - Whether to stop the auto-close on hover.
	 * @param {string|null} [param_toast_options.custom_class] - Custom classes to add to the toast.
	 * @param {string|null} [param_toast_options.custom_bg_color] - Custom background color for the toast.
	 * @param {string|null} [param_toast_options.custom_icon] - Custom icon classes for the toast.
	 * @param {Function|null} [param_toast_options.onClick] - Callback function for click events on the toast.
	 */
	show(message, param_toast_options = {}) {
		const toast_options = {
			type: "info",
			position: this.options.position,
			duration: this.options.duration,
			auto_close: this.options.auto_close,
			use_icons: this.options.use_icons,
			close_button: this.options.close_button,
			stopOnHover: this.options.stopOnHover,
			custom_class: this.options.custom_class,
			custom_bg_color: this.options.custom_bg_color,
			custom_icon: this.options.custom_icon,
			onClick: this.options.onClick,
			...param_toast_options,
		};

		const animation_duration = 600;
		const toast = this._createToast(message, toast_options.type, toast_options.position, toast_options.use_icons, toast_options.close_button, this.stopOnHover, toast_options.custom_class, toast_options.custom_bg_color, toast_options.custom_icon, toast_options.onClick);

		// Add the toast to the container
		this.container.appendChild(toast);

		// Auto close if enabled
		if (toast_options.auto_close) {
			this._autoClose(toast, toast_options.duration + animation_duration, toast_options.stopOnHover);
		}
	}

	/**
	 * A static method to create a new Toacc instance and show a toast.
	 * This is a shorthand for creating a new instance of Toacc and calling the show method on it.
	 *
	 * @param {Object} param_toast_options - See the Toacc.show method for options.
	 * @example
	 * Toacc.show({message: "Hello World!"});
	 */
	static show() {
		return new Toacc().show(...arguments);
	}

	/**
	 * Create the container for the toast messages
	 * @param {string} position - The position of the toast container
	 * @private
	 */
	_createContainer(position) {
		this.container = document.createElement("div");
		this.container.classList.add(this.classes.container, position);

		document.body.appendChild(this.container);
	}

	/**
	 * Creates a toast message with the given options.
	 *
	 * @param {string} message - The message to display in the toast.
	 * @param {string} type - The type of the toast. Can be "info", "success", "warning", or "error".
	 * @param {string} position - The position of the toast. Can be "top-left", "top-center", "top-right", "center-left", "center", or "center-right".
	 * @param {boolean} use_icons - Whether to use icons in the toast.
	 * @param {boolean} close_button - Whether to include a close button in the toast.
	 * @param {string|null} custom_class - Custom classes to add to the toast.
	 * @param {string|null} custom_bg_color - Custom background color for the toast.
	 * @param {string|null} custom_icon - Custom icon classes for the toast.
	 * @param {Function|null} onClick - Callback function for click events on the toast.
	 * @returns {HTMLElement} The created toast element.
	 * @private
	 */
	_createToast(message, type, position, use_icons, close_button, custom_class, custom_bg_color, custom_icon, onClick) {
		// Create the container if not exists
		if (!this.container) {
			this._createContainer(position);
		}

		const toast = document.createElement("div");

		// Add classes to the toast
		toast.classList.add(this.classes.toast, this.classes.toast + "__" + type);
		if (custom_class) {
			custom_class = custom_class.split(" ");
			custom_class.forEach((cls) => toast.classList.add(cls));
		}

		// Add background color
		toast.classList.add(this.classes.toast + "__" + type);
		if (custom_bg_color) {
			toast.style.backgroundColor = custom_bg_color;
		}

		// Add Icon
		if (use_icons) {
			const icon = document.createElement("span");
			icon.className = "toacc__toast__icon";

			const fa_icon = document.createElement("i");
			if (custom_icon) {
				fa_icon.className = custom_icon;
			} else {
				switch (type) {
					case "info":
					default:
						fa_icon.classList.add("fa-solid", "fa-info");
						break;
					case "success":
						fa_icon.classList.add("fa-solid", "fa-check");
						break;
					case "warning":
						fa_icon.classList.add("fa-solid", "fa-exclamation");
						break;
					case "error":
						fa_icon.classList.add("fa-solid", "fa-xmark");
						break;
				}
			}

			icon.appendChild(fa_icon);
			toast.appendChild(icon);
		}

		// Add message text
		const message_text = document.createElement("span");
		message_text.classList.add("toacc__toast__message");
		message_text.innerHTML = message;
		toast.appendChild(message_text);

		// Add Close Btn
		if (close_button) {
			const close_button = document.createElement("span");
			close_button.classList.add("toacc__toast__close_button");

			const close_button_icon = document.createElement("i");
			close_button_icon.classList.add("fa-solid", "fa-xmark");

			close_button.appendChild(close_button_icon);
			toast.appendChild(close_button);

			close_button.previousElementSibling.style.marginRight = "20px";

			// Add Event to Close Btn
			close_button.addEventListener("click", (event) => {
				event.stopPropagation();
				this._removeToast(toast);
			});
		}

		// add onClickEvent
		if (typeof onClick === "function") {
			toast.style.cursor = "pointer";
			toast.addEventListener("click", () => {
				onClick(toast);
			});
		}
		return toast;
	}

	/**
	 * Removes a toast from the container
	 *
	 * @param {HTMLElement} toast - The toast element to remove
	 * @private
	 */
	_removeToast(toast) {
		toast.style.opacity = "0";
		toast.addEventListener("transitionend", () => {
			this.container.removeChild(toast);
			if (this.container.children.length === 0) {
				this.container.remove();
				this.container = null;
			}
		});
	}

	/**
	 * Automatically closes a toast after a given duration.
	 * If the toast has a close button, it will be cleared when the button is clicked.
	 * If stopOnHover is true, the auto-close will be stopped when the user hovers the toast and resumed when the user leaves the toast.
	 *
	 * @param {HTMLElement} toast - The toast element to auto-close
	 * @param {number} duration - The duration in milliseconds before the toast closes automatically
	 * @param {boolean} stopOnHover - Whether to stop the auto-close when the user hovers the toast
	 * @private
	 */
	_autoClose(toast, duration, stopOnHover) {
		let timeout = setTimeout(() => {
			this._removeToast(toast);
		}, duration);

		const close_button = toast.querySelector(".toacc__toast__close_button");
		if (close_button) {
			close_button.addEventListener("click", () => {
				clearTimeout(timeout);
			});
		}

		if (stopOnHover) {
			toast.addEventListener("mouseenter", () => {
				clearTimeout(timeout);
			});

			toast.addEventListener("mouseleave", () => {
				timeout = setTimeout(() => {
					this._removeToast(toast);
				}, duration);
			});
		}
	}
}
