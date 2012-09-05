def show_bracket(teams)
  i=0
  teams.each do |t|
    school = t ? t.school : ""
    puts "#{i} #{school}"
    i+=1
  end
end

east= helper.set_bracket(Team.where(:region => "East"))
show_bracket(east)
