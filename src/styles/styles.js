export const mainPadding = {
	paddingLeft: "12px",
	paddingRight: "12px",
};
export const wrapperForAbsolute = {
	position: "relative",
};
export const secondTitle = {
	fontFamily: "Lato",
	fontSize: "18px",
	lineHeight: "24px",
	fontWeight: "bold",
	margin: 0,
};

export const colors = {
	background: {
		default: "#f0f2f5",
	},

	text: {
		main: "#333",
		focus: "#555",
	},

	transparent: {
		main: "transparent",
	},

	white: {
		main: "#ffffff",
		focus: "#ffffff",
	},

	black: {
		light: "#000000",
		main: "#000000",
		focus: "#000000",
	},

	primary: {
		main: "#25a9b5",
		focus: "#157b85",
	},

	secondary: {
		main: "#92cdd3",
		focus: "#92cdd3",
	},

	info: {
		main: "#25a9b5",
		focus: "#177f89",
	},

	success: {
		main: "#4CAF50",
		focus: "#67bb6a",
	},

	warning: {
		main: "#fb8c00",
		focus: "#fc9d26",
	},

	error: {
		main: "#F44335",
		focus: "#f65f53",
	},

	light: {
		main: "#f0f2f5",
		focus: "#f0f2f5",
	},

	dark: {
		main: "#344767",
		focus: "#2c3c58",
	},

	grey: {
		100: "#f8f9fa",
		200: "#f0f2f5",
		300: "#dee2e6",
		400: "#ced4da",
		500: "#adb5bd",
		600: "#6c757d",
		700: "#495057",
		800: "#343a40",
		900: "#212529",
	},

	gradients: {
		primary: {
			main: "#EC407A",
			state: "#D81B60",
		},

		secondary: {
			main: "#747b8a",
			state: "#495361",
		},

		info: {
			main: "#49a3f1",
			state: "#1A73E8",
		},

		success: {
			main: "#66BB6A",
			state: "#43A047",
		},

		warning: {
			main: "#FFA726",
			state: "#FB8C00",
		},

		error: {
			main: "#EF5350",
			state: "#E53935",
		},

		light: {
			main: "#EBEFF4",
			state: "#CED4DA",
		},

		dark: {
			main: "#42424a",
			state: "#191919",
		},
	},

	socialMediaColors: {
		facebook: {
			main: "#3b5998",
			dark: "#344e86",
		},

		twitter: {
			main: "#55acee",
			dark: "#3ea1ec",
		},

		instagram: {
			main: "#125688",
			dark: "#0e456d",
		},

		linkedin: {
			main: "#0077b5",
			dark: "#00669c",
		},

		pinterest: {
			main: "#cc2127",
			dark: "#b21d22",
		},

		youtube: {
			main: "#e52d27",
			dark: "#d41f1a",
		},

		vimeo: {
			main: "#1ab7ea",
			dark: "#13a3d2",
		},

		slack: {
			main: "#3aaf85",
			dark: "#329874",
		},

		dribbble: {
			main: "#ea4c89",
			dark: "#e73177",
		},

		github: {
			main: "#24292e",
			dark: "#171a1d",
		},

		reddit: {
			main: "#ff4500",
			dark: "#e03d00",
		},

		tumblr: {
			main: "#35465c",
			dark: "#2a3749",
		},
	},

	badgeColors: {
		primary: {
			background: "#f8b3ca",
			text: "#cc084b",
		},

		secondary: {
			background: "#d7d9e1",
			text: "#6c757d",
		},

		info: {
			background: "#aecef7",
			text: "#095bc6",
		},

		success: {
			background: "#bce2be",
			text: "#339537",
		},

		warning: {
			background: "#ffd59f",
			text: "#c87000",
		},

		error: {
			background: "#fcd3d0",
			text: "#f61200",
		},

		light: {
			background: "#ffffff",
			text: "#c7d3de",
		},

		dark: {
			background: "#8097bf",
			text: "#1e2e4a",
		},
	},

	coloredShadows: {
		primary: "#e91e62",
		secondary: "#110e0e",
		info: "#00bbd4",
		success: "#4caf4f",
		warning: "#ff9900",
		error: "#f44336",
		light: "#adb5bd",
		dark: "#404040",
	},

	inputBorderColor: "#d2d6da",

	tabs: {
		indicator: { boxShadow: "#ddd" },
	},
};

const baseProperties = {
	fontFamily: [
		"Lato",
		"Arial",
		"Roboto",
		'"Helvetica Neue"',
		"Arial",
		"sans-serif",
	].join(","),
	fontWeightLighter: 100,
	fontWeightLight: 300,
	fontWeightRegular: 400,
	fontWeightMedium: 600,
	fontWeightBold: 700,
	button: {
		fontSize: "1rem",
		fontWeight: "600",
		textTransform: "none",
	},
	fontSizeXXS: "16px",
	// fontSizeXS: pxToRem(12),
	// fontSizeSM: pxToRem(14),
	// fontSizeMD: pxToRem(16),
};

const baseHeadingProperties = {
	fontFamily: baseProperties.fontFamily,
	color: colors.dark.main,
	fontWeight: baseProperties.fontWeightBold,
};

export const typography = {
	fontFamily: baseProperties.fontFamily,
	fontWeightLighter: baseProperties.fontWeightLighter,
	fontWeightLight: baseProperties.fontWeightLight,
	fontWeightRegular: baseProperties.fontWeightRegular,
	fontWeightMedium: baseProperties.fontWeightMedium,
	fontWeightBold: baseProperties.fontWeightBold,

	h1: {
		// fontSize: pxToRem(48),
		lineHeight: 1.25,
		...baseHeadingProperties,
	},

	h2: {
		// fontSize: pxToRem(36),
		lineHeight: 1.3,
		...baseHeadingProperties,
	},

	h3: {
		// fontSize: pxToRem(30),
		lineHeight: 1.375,
		...baseHeadingProperties,
	},
	size: {
		xxs: baseProperties.fontSizeXXS,
		xs: baseProperties.fontSizeXS,
		sm: baseProperties.fontSizeSM,
		md: baseProperties.fontSizeMD,
		lg: baseProperties.fontSizeLG,
		xl: baseProperties.fontSizeXL,
		"2xl": baseProperties.fontSize2XL,
		"3xl": baseProperties.fontSize3XL,
	},

	lineHeight: {
		sm: 1.25,
		md: 1.5,
		lg: 2,
	},
};

export const buttons = {
	styleOverrides: {
		contained: {
			backgroundColor: colors.white.main,
			color: colors.text.main,
			// padding: `${pxToRem(9)} ${pxToRem(24)}`,

			// "&:hover": {
			// 	backgroundColor: white.main,
			// },

			"&:active, &:active:focus, &:active:hover": {
				opacity: 0.85,
			},

			// "& .material-icon, .material-icons-round, svg": {
			// 	fontSize: `${pxToRem(16)} !important`,
			// },
		},

		containedPrimary: {
			backgroundColor: colors.primary.main,
			color: colors.white.main,

			"&:hover": {
				backgroundColor: colors.primary.main,
			},

			"&:focus:not(:hover)": {
				backgroundColor: colors.primary.focus,
			},
		},

		containedSecondary: {
			backgroundColor: colors.secondary.main,

			"&:hover": {
				backgroundColor: colors.secondary.main,
			},

			"&:focus:not(:hover)": {
				backgroundColor: colors.secondary.focus,
			},
		},
	},
};