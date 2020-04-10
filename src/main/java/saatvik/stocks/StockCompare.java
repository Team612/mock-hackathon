package saatvik.stocks;

import java.awt.Color;

import java.awt.GridLayout;
import java.io.IOException;
import java.math.BigDecimal;
import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.JScrollPane;
import javax.swing.JTable;
import javax.swing.WindowConstants;


import yahoofinance.Stock;
import yahoofinance.YahooFinance;


public class StockCompare{
    public static void main( String[] args ) throws IOException{
    	
    	Stock stock1 = YahooFinance.get("AMZN");
    	Stock stock2 = YahooFinance.get("MSFT");
    	Stock stock3 = YahooFinance.get("GOOGL");
    	Stock stock4 = YahooFinance.get("INTC");
    	Stock stock5 = YahooFinance.get("AAPL");


    	 
    	 JFrame frame = new JFrame("Stonks");
    	 frame.setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);
    	 JPanel panel = new JPanel(new GridLayout(3,0,4,4));
    	
    	     
    	     frame.setContentPane(panel);
        	 frame.pack();
        	 frame.setVisible(true);
        	
             frame.setSize(400,400);
            
             panel.setBackground(Color.WHITE);
             String[] columnNames = {"Name",
            		 "Price",
                     "Change in Percent",
                     "Previous Close Price",
                     "Year High",
                     "Year Low"};

            
             Object[][] data = {
            		    {name(stock1), price(stock1),change(stock1), prevClose(stock1),yearHigh(stock1), yearLow(stock1)},
            		    {name(stock2), price(stock2),change(stock2), prevClose(stock2),yearHigh(stock2), yearLow(stock2)},
            		    {name(stock3), price(stock3),change(stock3), prevClose(stock3),yearHigh(stock3), yearLow(stock3)},
            		    {name(stock4), price(stock4),change(stock4), prevClose(stock4),yearHigh(stock4), yearLow(stock4)},
            		    {name(stock5), price(stock5),change(stock5), prevClose(stock5),yearHigh(stock5), yearLow(stock5)}};

            		    
            
			JTable table = new JTable(data, columnNames);
			table.setPreferredScrollableViewportSize(table.getPreferredSize());
			table.setFillsViewportHeight(true);
			panel.add(new JScrollPane(table));
             
             frame.setVisible(true);
            
            
         }
             
    	
   public static String name(Stock a) {
	 String n=a.getName();
	 return n;
}

public static String price(Stock a) {
	 BigDecimal price=a.getQuote().getPrice();
	 return price.toString();
}
public static String change(Stock a) {
	 BigDecimal price=a.getQuote().getChangeInPercent();
	 return price.toString();
}
public static String prevClose(Stock a) {
	 BigDecimal price=a.getQuote().getPreviousClose();
	 return price.toString();
}
public static String yearHigh(Stock a) {
	 BigDecimal price=a.getQuote().getYearHigh();
	 return price.toString();
}
public static String yearLow(Stock a) {
	 BigDecimal price=a.getQuote().getYearLow();
	 return price.toString();
}
        
    	
    	
}
	
	    	
	

