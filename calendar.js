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
    var startDate = new Date($('#startDate').val());
    var numberOfDays = parseInt($('#numberOfDates').val(),10);
    var countryCode = $('#countryCode').val();

    //calculate end date
    var endDate = startDate.addDays(numberOfDays);

    //caculate day of the week when all start
    var startDay = startDate.getDay(); // 0 Sunday 

    //calculate how many months I have to paint
    var monthsToPaint = (endDate.getFullYear()*12 + endDate.getMonth()) - (startDate.getFullYear()*12 + startDate.getMonth()) + 1;    

    //days in month
    var daysInMonth = (startDate.monthDays() - startDate.getDate());

    for(var i=1;i<= monthsToPaint; i++){

        //get the month title
        locale = "en-us",
        monthName = startDate.toLocaleString(locale, { month: "long" });

        //calculate number of days to paint ? 
        var daysToPaint = 0;        
        

        numberOfDays = numberOfDays - daysToPaint;

        var month = {
            month : monthName,
            startDate: startDate,
            weekStartDate: startDay,
            daysToPaint: daysToPaint,
            holidays: []
        };

        calendar.push(month);
        
        //calculate start date for next month
        startDate = startDate.addDays(daysInMonth);

        //calculate the day the month starts
        startDay = startDate.getDay(); // 0 Sunday 
        
        //get holidays for that month
    }


    $('#calendar').text(JSON.stringify(calendar));
    
};

