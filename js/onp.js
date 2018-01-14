//(((a))+b+d)*(d+e) --> abd++de+*
// ((2*5+1)/2) --> 25*1+2/
//12+a*(b*c+d/e) --> 12abc*de/+*+

function przeksztalcInfiksDoPostfiks(wyrazenie)
{
	var wyjscie = [];
	var stos = [];
	//stack[stack.length-1] peek
	for (var i = 0;  i < wyrazenie.length; i++) 
	{
		var symbol = wyrazenie.charAt(i);
		if(czyLewyNawias(symbol))
		{
			stos.push(symbol);
		}
	    else if (czyPrawyNawias(symbol))
		{
			var szczyt = stos[stos.length-1];
			while(!czyStosPusty(stos) && !czyLewyNawias(szczyt)) 
			{
				szczyt = stos.pop();
				if(!czyLewyNawias(szczyt))
					wyjscie.push(szczyt);
				szczyt = stos[stos.length-1];
			}
			stos.pop(); //wywalenie '(' ze stosu
        }			
		else if(czyOperand(symbol))
		{
			wyjscie.push(symbol);
		}
		else if(czyOperator(symbol))
		{
			var szczyt = stos[stos.length-1];
			while(!czyStosPusty(stos) && !czyLewyNawias(szczyt) && !czyOperatorMaWiekszyPriorytet(symbol, szczyt))
			{
				szczyt = stos.pop();
				if(!czyLewyNawias(szczyt))
					wyjscie.push(szczyt);
				szczyt = stos[stos.length-1];
			}
			stos.push(symbol);
		}
	}   
	while(!czyStosPusty(stos))
	{
		var szczyt = stos.pop();
		wyjscie.push(szczyt);
	}
	return wyjscie;
}

function czyStosPusty(stos)
{
	return stos.length == 0;
}
function czyOperand(symbol) 
{
	var wzorzec =  /^\w$/;
	var wynik = sprawdzanieWzorca(symbol, wzorzec);
	return wynik;
}

function czyOperator(symbol)
{
	var wzorzec = /^\W$/;
	var wynik = sprawdzanieWzorca(symbol, wzorzec);
	return wynik;
}

function sprawdzanieWzorca(wyrazenie, wzorzec)
{
	return $.trim(wyrazenie).match(wzorzec) ? true : false;
}

function priorytet(operator){
	switch(operator)
	{
		case "^":
			return 3;
		case "*":
		case "/":
			return 2;
		case "+":
		case "-":
			return 1;
		default:
			return 0;
	}
}

function czyLewyNawias(symbol)
{
	if (symbol == '(') 
		return true;
	return false;
}

function czyPrawyNawias (symbol)
{
	if (symbol == ')') 
		return true;
	return false;
}

function czyOperatorMaWiekszyPriorytet(operator1, operator2)
{
	var priorytet1 = priorytet(operator1);
	var priorytet2 = priorytet(operator2);
	var czyWiekszy = priorytet1 >= priorytet2;
	return czyWiekszy;
}