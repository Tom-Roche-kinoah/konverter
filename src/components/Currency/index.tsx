interface CurrencyContent {
	code: string;
	description: string;
	setCurrent: any;
	current: string
}

function Currency({ code, description, setCurrent, current }:CurrencyContent) {
	return (
		<li
			className={current === description ? "currency-item current" : "currency-item"}
			onClick={() => setCurrent({description: description, code: code})}
		>
			<span className="currency-code">{code}</span>
			<span className="currency-description">{description}</span>
		</li>
	)
}

export default Currency;
