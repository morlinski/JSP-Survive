<%@page import="java.sql.DriverManager"%>
<%@page import="java.sql.*"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <link rel="stylesheet" href="styles/main.css" type="text/css"/>
        <title>Survive! highscores</title>
    </head>
    <body class="ltrbPadding">
        <h1>HighScores</h1>
        <% 
     
            try{
                Class.forName("com.mysql.jdbc.Driver");
                String dburl = "jdbc:mysql://localhost:3306/Survive";
                String username = "root";
                String password = "";
                Connection connection = DriverManager.getConnection(dburl, username, password);
                
                session.setAttribute("showResults", "is ok");
                
                Statement statement = connection.createStatement();
                ResultSet resultSet = statement.executeQuery("SELECT * FROM Highscores");
                
                String highscore_table = "<table><tr><th>nickname</th><th>class</th><th>score</th></tr>";
                
                while(resultSet.next()){
                    //process DB Columns
                    highscore_table += "<tr>";
                    highscore_table += ("<td>"+resultSet.getString("nickname")+"</td>");
                    highscore_table += ("<td>"+resultSet.getString("class")+"</td>");
                    highscore_table += ("<td>"+resultSet.getInt("score")+"</td>");
                    highscore_table += "</tr>";
                }
                
                session.setAttribute("showErrors", "");
                highscore_table += "</table>";
                session.setAttribute("showResults", highscore_table);
                
                resultSet.close();
                statement.close();
                connection.close();
                
            } catch (SQLException e){
                String error = "An Error(s) Have Occured : \n\n";
                for(Throwable t: e){
                    //t.printStackTrace();
                    error += t.getMessage();
                    error += "\n";
                }
                session.setAttribute("showErrors", error);
                session.setAttribute("showResults", "");
            }
        %>
        <%-- <h1>${showResults} +++ ${showErrors}</h1> --%>
        <p>${showResults}</p>
        <p>${showErrors}</p>
        <h3>BACK to home.&nbsp;&nbsp;&nbsp;<a href="/testApp"> take me there.</a></h3>
    </body>
</html>
