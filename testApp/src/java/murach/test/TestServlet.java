package murach.test;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.util.*;

public class TestServlet extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    
    public void initGameScreen(PrintWriter pr){
        //pr.println("Hohhhh");
        //pr.println("<div id='surviveContainer'><canvas id=\"survive\" width=\"950\" height=\"565px\"></canvas></div>");
        pr.println("<div id='surviveContainer'><canvas id='survive' height='565px'></canvas><div id='homePanel'>"
                +"<br/>ACHIEVEMENTS :  <div id='currentAchievments'>no achievements met.</div>"
                +"CHALLENGES :  <div id='currentChallenges'>currently not issued challenges.</div>"
                +"<div id='urgentMessages'>!URGENT :&nbsp;&nbsp;<span id='findfood'>Find Food,  </span><span id='findwater'>Find Water,  </span><span id='fortifybase'>Fortify Base</span>!</div>"
                + "</div></div>");
        
        pr.println("<script>" +
                    "var canvas = document.getElementById(\"survive\");\n" +
                    "var ctx = canvas.getContext(\"2d\");\n" +
                    "putPlayer()" +
                    "</script>");
    }
    
    public void printStat(PrintWriter pr, String label, String id, Object o){
                pr.println(label.trim()+" :<span class='stat' id='"+id+"'>");
                pr.println(o);
                pr.println("</span>");
    }
    
    //Check and Process the informatin of requests being made.
    public String[] checkTextInputs(String strIn, String match, String strErr, HttpServletRequest request){
        
        String[] result = new String[2];
        result[1] = "";
        try{
            strIn = request.getParameter(match);
            //contains non-alpha numeric characters
            //strIn.matches("^.*[^a-zA-Z0-9 ].*$")
            //^ start
            //$ end before /n
            //. wildcard characeter to match all but /n
            //[^ match by negation of chars]
            if(strIn == null){
                strIn = "guest";
            }
            else if(strIn.matches("^.*[^a-zA-Z0-9 ].*$")){
                strIn = "id10TIER";
            }
            result[0] = strIn;
        }
        catch(Exception e){
            //some unknown error has occurred check debug info div.
            strIn = "Debug";
            strErr = e.getMessage();
            result[1] = strErr;
        }
        return result;
    }
    public String[] checkRadioInputs(String strIn, String match, String strErr, HttpServletRequest request){
        //add matches as a possible parameter in the future for a utility function.
        String[] matches = {"Ceo","Boxer","Doctor","Priest","Dreamer"};
        java.util.ArrayList<String> findMatches = new java.util.ArrayList<>();
        for(String item:matches){
            findMatches.add(item);
        }
  
        String[] result = new String[2];
        result[1] = "";
        try{
            strIn = request.getParameter(match);
            if(strIn == null){
                strIn = "Doctor";
            }
            else if(!findMatches.contains(strIn)){
                strIn = "Handicapped";
            }
            result[0] = strIn;
        }
        catch(Exception e){
            //some unknown error has occurred check debug info div.
            strIn = "Unknown";
            strErr = e.getMessage();
            result[1] = strErr;
        }
        return result;
    }
    
    
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        final String OK = "--STATUS-OK--";
        String errorMessage = "";
        String[] results = new String[2];
        
        String nickname = null;
        String characterClass = null;
        
        /*try{
            nickname = request.getParameter("nickName");
            if(nickname == null){
                nickname = "guest";
            }
        }
        catch(Exception e){
            //some unknown error has occurred check debug info div.
            nickname = "Debug";
            errorMessage = e.getMessage();
        }*/
        results = checkTextInputs(nickname, "nickName", errorMessage, request);
        nickname = results[0];
        errorMessage += results[1];
        
        results = checkRadioInputs(characterClass, "classid", errorMessage, request);
        characterClass = results[0];
        errorMessage += results[1];
        
        String[] trait = null;
        //MUST BE INITIALIZED AS FOLLOWS IF NULL...
        String chainedTraits = "";
        //String[] traits = {"Backpack","Invincibility","EasyMode"};
        List<String> traits = Arrays.asList("Backpack","Invincibility","EasyMode","All");
        try{
            trait = request.getParameterValues("extra");
            //TRAIT INITIALIZATION HERE...
            if(trait == null){
                trait = new String[1];
                trait[0] = "EasyMode";
            }
                        
            for(String aTrait:trait){
                if(!(traits).contains(aTrait)){
                    chainedTraits = "None";
                }
                else if((traits).contains(aTrait)){
                    chainedTraits += aTrait;
                    chainedTraits += " ";
                }
            }
      
        }
        catch(Exception e){
            errorMessage += e.getMessage();
        }
        
        //No problems to report.
        if(errorMessage.equals("")){
            errorMessage = OK;
        }
        
        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
            /* TODO output your page here. You may use following sample code. */
            out.println("<!DOCTYPE html>");
            out.println("<html>");
            out.println("<head>");
            out.println("<title>Play Survive!</title>"); 
            out.println("<link rel=\"stylesheet\" href=\"styles/main.css\" type=\"text/css\"/>");
            out.println("<script src='./scripts/surviveJS.js'></script>");
            out.println("</head>");
            out.println("<body onload='setCanvasWidth()'>");
            out.println("<script>");
                //out.println("var player = ['"+nickname+"','"+characterClass+"','"+chainedTraits+"']");
                out.println("player = ['"+nickname+"','"+characterClass+"','"+chainedTraits+"']");
                //out.println("var hp = 100; var score = 0; var df = 60; var food = 10; var water = 15; var comfort = 10;"); //previous method.
                out.println("");
            out.println("</script>");
            //out.println("<h1>Servlet TestServlet at " + request.getContextPath() + "</h1>");
            //out.println("<h1></h1>")
            out.println("<div class='shell'>");
                //start if stat bar.
                out.println("<div class='statbar'>");
                out.println("NN :<span class='stat'>");
                out.println(nickname);
                out.println("</span>");
                out.println("CLS :<span class='stat'>");
                out.println(characterClass);
                out.println("</span>");
                out.println("TR :<span class='stat'>");
                out.println(chainedTraits);
                out.println("</span>");
                printStat(out,"HP ","hp",100);
                printStat(out,"FOOD ","food",10);
                printStat(out,"WATER ","water",15);
                printStat(out,"COMFORT ","comfort",10);
                printStat(out,"DF ","df",60);
                printStat(out,"SCORE ","score",0);
                //end of stat bar.
                //border bottom or hr element follows.
                out.println("</div>");
                
                //draw canvas element and place game scripts here.
                initGameScreen(out);
                
                //out.println("<div id='urgentMessages'>!URGENT :&nbsp;&nbsp;<span id='findfood'>Find Food,  </span><span id='findwater'>Find Water,  </span><span id='fortify base'>Fortify Base</span>!</div>");
                
            out.println("</div>");
            out.println("<p class='instructions'>Instructions: WASD(move) , Mouse-Click(long-range attack) , Hover-Over(check house supplies) , Q(uit).</p>");
            //Debug Me Info.
                //errorMessage = "Error: This is a test.";
                if(!errorMessage.equals(OK)){
                    out.print("<div class='showError'>"+errorMessage+"</div>");
                }
            out.println("</body>");
            out.println("</html>");
            
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        //processRequest(request, response);
        doPost(request,response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
        /*response.setContentType("text/html");
        PrintWriter out = response.getWriter();
        try{
            out.println("<h1>HTML from basic servlet here. (not dynamic)</h1>");
        }
        finally{
            out.close();
        }*/
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
