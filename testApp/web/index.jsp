<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Survive!</title>
        <link rel="stylesheet" href="styles/main.css" type="text/css"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body class="hasBg">
        <div class="intro">
            <h2 class="gameIntro">Survive!</h2>
            <span class="gameDesc">
                Test your skills in a post apocalyptic world.
            </span>
            Step 1 : Welcome, please enter your information below to continue...<br/>
            <!--if cookies are set use that value for the get request-->
            <% 
                
                try {
                Cookie[] cookies = request.getCookies();
                String cookieName = "resumeSurviveGameplay";
                
                FOUND:for (Cookie cookie: cookies){
                    if(cookieName.equals(cookie.getName())){
                        System.out.println("has cookie : "+cookie.getName()+" cur value:"+cookie.getValue());
                        String url = "./test"+cookie.getValue();
                        request.setAttribute(cookieName, url);
                        //this.getServletContext().getRequestDispatcher(url).forward(request, response);
                        break FOUND;
                   
                    }
                    else{ request.setAttribute(cookieName, "./test"); System.out.println("not cookie"+cookie.getName()); }
                }
                }
                catch(NullPointerException e){}
                
            %>
            <!--<a href="./test">No, just get on with it.</a>-->
            <a href=${resumeSurviveGameplay}>No, just get on with it.</a>
        </div>
        <form action="./test" method="get">
            <label>Enter Your Nickname :&nbsp;</label><input type="text" name="nickName" value="guest" required>
            <br/>
            <label>Select Class :</label>
            <input type="radio" name="classid" value="Ceo"/><label>(CEO)</label>
            <input type="radio" name="classid" value="Boxer"/><label>(Boxer)</label>
            <input type="radio" name="classid" value="Doctor" checked/><label>(Doctor)</label>
            <input type="radio" name="classid" value="Priest"/><label>(Priest)</label>
            <input type="radio" name="classid" value="Dreamer"/><label>(Dreamer)</label>
            <!--add cheat code to enable multiple item selections here? perhaps monitoring the nickname-->
            <br/>
            <label>Select a Trait :&nbsp;</label>
            <select name="extra" >
                <option value="Backpack">Carry more stuff.</option>
                <option value="Invincibility">Your growth is limited.</option>
                <option value="EasyMode" selected>Enemies fall at your feet.</option>
            </select>
            <br/>
            <button type="submit">Game On!!</button>
        </form>
    </body>
</html>