class Toacc {
	constructor(options = {}) {
		this.options = {
			position: "top-right",
			duration: 4000,
			auto_close: true,
			use_icons: true,
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
	 * Show the toast
	 * @param message       		The toast message
	 * @param type          		The toast type (info, success, warning, error)
	 * @param duration      		The toast duration before closing (don't work if the auto_close option is disabled)
	 * @param custom_classes  	Add extra classes, separated by spaces
	 * @param custom_bg_color  	Override the standard background color
	 * @param custom_icon  			Override the standard icon, add classes of font-awesome icon
	 * @param onClick  					Add and onClick function
	 */
	show(param_toast_options = {}) {
		const toast_options = {
			message: "",
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
		const toast = this._createToast(toast_options.message, toast_options.type, toast_options.position, toast_options.use_icons, toast_options.close_button, this.stopOnHover, toast_options.custom_class, toast_options.custom_bg_color, toast_options.custom_icon, toast_options.onClick);

		// Add the toast to the container
		this.container.appendChild(toast);

		// Auto close if enabled
		if (toast_options.auto_close) {
			this._autoClose(toast, toast_options.duration + animation_duration, toast_options.stopOnHover);
		}
	}

	static show() {
		return new Toacc().show(...arguments);
	}

	/**
	 * Create the Toacc container for the toasts
	 */
	_createContainer(position) {
		this.container = document.createElement("div");
		this.container.classList.add(this.classes.container, position);

		document.body.appendChild(this.container);
	}

	/**
	 * Show the toast
	 * @param message       		The toast message
	 * @param type          		The toast type (info, success, warning, error)
	 * @param custom_classes  	Add extra classes, separated by spaces
	 * @param custom_bg_color  	Override the standard background color
	 * @param custom_icon  			Override the standard icon, add classes of font-awesome icon
	 * @param onClick  					Add and onClick function
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
	 * Remove the toast
	 * @param toast 	The toast element
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
	 * Auto close the toast after a duration
	 * @param toast      The toast element
	 * @param duration		The duration
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
