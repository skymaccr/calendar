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
        var year = startDate.getFullYear();

        //calculate number of days to paint ?         
        var daysToPaint = 0;        
        
        if(daysInMonth > numberOfDays)
            daysToPaint = numberOfDays;
        else
            daysToPaint = daysInMonth;

        numberOfDays = numberOfDays - daysToPaint;

        //get the month to paint
        var month = {
            month : monthName +' '+ year,
            startDate: startDate.getDate(),
            weekStartDate: startDay,
            daysToPaint: daysToPaint,
            monthNumber: startDate.getMonth()+1,
        };

        calendar.push(month);
        
        //calculate start date for next month
        startDate = startDate.addDays(daysInMonth);
        daysInMonth = startDate.monthDays();
        //calculate the day the month starts
        startDay = startDate.getDay(); // 0 Sunday 
        //get holidays for that month
    }

    var app = new Vue({
        el: '#app',
        data: {todos: calendar},
        methods: {
            getMonth : function (month) {
                var week = [];
                for(var i=0; i < 7;i++)
                {
                    if(i === month.weekStartDate){                        
                        for(var j=0; j < month.daysToPaint; j++)
                        {
                            week.push(month.startDate + j);
                        }
                        break;
                    }
                    week.push(" ");                        
                }

                //complete blank days in the last week
                for(var i=0; i < week.length % 7; i++)
                {
                    week.push(" "); 
                }

                return week;
            },
            isWeekend : function(index){
                var weekends = [0,6,7,13,14,20,21,27,28,34,35];
                return weekends.includes(index);
            },
            isHoliday : function(day, monthNumber){
                var usHolidays = ['1/1','1/21','2/18','5/27','7/4','9/2','11/28','11/29','12/25'];
                var crcHolidays = ['1/1','4/11','5/1','7/25','8/2','8/15','9/15','10/12','12/25'];
                var toFind = monthNumber +'/'+ day;
                var countryCode = $('#countryCode').val();
                if(countryCode == 'cr')
                    return crcHolidays.includes(toFind);
                else
                    return usHolidays.includes(toFind);
            },
        }
    });
    
};

