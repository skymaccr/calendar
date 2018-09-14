Date.prototype.monthDays= function(){
    var d= new Date(this.getFullYear(), this.getMonth()+1, 0);
    return d.getDate();
}

Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

function loadCalendar(){
    //result object
    var calendar = [];

    //read parameters from interface
    var date = new Date($('#startDate').val())
    var userTimezoneOffset = date.getTimezoneOffset() * 60000;
    var startDate = new Date(date.getTime() + userTimezoneOffset);
    var numberOfDays = parseInt($('#numberOfDates').val(),10);
    var countryCode = $('#countryCode').val();

    //calculate end date
    var endDate = startDate.addDays(numberOfDays - 1);
    //caculate day of the week when all start
    var startDay = startDate.getDay(); // 0 Sunday 
    //calculate how many months I have to paint
    var monthsToPaint = (endDate.getFullYear()*12 + endDate.getMonth()) - (startDate.getFullYear()*12 + startDate.getMonth()) + 1;    
    //calculate days pending in the current month
    var daysInMonth = (startDate.monthDays() - startDate.getDate()) + 1;

    for(var i=1;i<= monthsToPaint; i++){
        //get the month title
        locale = "en-us",
        monthName = startDate.toLocaleString(locale, { month: "long" });

        //calculate number of days to paint ?         
        var daysToPaint = 0;        
        
        if(daysInMonth > numberOfDays)
            daysToPaint = numberOfDays;
        else
            daysToPaint = daysInMonth;

        numberOfDays = numberOfDays - daysToPaint;

        //get the month to paint
        var month = {
            month : monthName,
            startDate: startDate.getDate(),
            weekStartDate: startDay,
            daysToPaint: daysToPaint,
            holidays: []
        };

        calendar.push(month);
        
        //calculate start date for next month
        startDate = startDate.addDays(daysInMonth);
        daysInMonth = startDate.monthDays();
        //calculate the day the month starts
        startDay = startDate.getDay(); // 0 Sunday 
        //get holidays for that month
    }


    $('.calendar').text(JSON.stringify(calendar));

    var app = new Vue({
        el: '#app',
        data: {todos: calendar},
        methods: {
            getMonth : function (month) {
                var week = [];
                for(var i=0; i< 7;i++)
                {
                    if(i === month.weekStartDate){                        
                        for(var j=0; j <= month.daysToPaint; j++)
                        {
                            week.push(month.startDate + j);
                        }
                        break;
                    }
                    week.push(" ");                        
                }
                return week;
            },
        }
    });
    
};

