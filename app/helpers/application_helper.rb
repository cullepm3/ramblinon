module ApplicationHelper
  
  def round (i)
    rounds= ["64", "32", "16", "8", "4", "2", "1"]
    i > 0 && i < rounds.length ? rounds[i] : i
  end

  def set_bracket(teams)
    (0..14).each do |i|
      teams << nil
    end
    
    ii= 16
    (0..7).each do |i|     
      j = 2*i
      if teams[j] && teams[j+1]      
#        logger.info("#{i} #{teams[j].school} #{teams[j+1].school}")  
        if teams[j].wins >= 1 
          teams[ii+i]= teams[j]
        elsif teams[j+1].wins >= 1 
          teams[ii+i]= teams[j+1]
        end
#        logger.info("#{ii} #{teams[ii].school}")  
      end
    end

    ii= 24
    (0..3).each do |i|
      j= 16+2*i
      if teams[j] && teams[j+1]  
#        logger.info("#{j} #{teams[j].school} #{teams[j+1].school}")      
        if teams[j].wins >= 2
          teams[ii+i]= teams[j]
        elsif teams[j+1].wins >= 2
          teams[ii+i]= teams[j+1]
        end
      end
    end

    ii= 28
    (0..1).each do |i|
      j= 24+2*i
      if teams[j] && teams[j+1]
        puts("#{ii+i} #{teams[j].school} #{teams[j+1].school}")      
        if teams[j].wins >= 3 
          teams[ii+i]= teams[j]
        elsif teams[j+1].wins >= 3 
          teams[ii+i]= teams[j+1]
        end
      end
    end
    
    ii=28
    j= 26
    if teams[j] and teams[j+1]
      if teams[j].wins >= 4 
        teams[ii+1]= teams[j]
      elsif teams[j+1].wins >= 4
        teams[ii+1]= teams[j+1]
      end
    end
    teams    
  end
end
