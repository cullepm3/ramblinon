#!/Users/cullepm3/.rvm/rubies/ruby-1.9.3-p125/bin/ruby

require 'csv'
require 'yaml'

rows= CSV.read("db/raw.csv")
names=[]
rows.each do |row|
  names << row[2]
  names << row[3]
end

names = names & names
names.compact!
names.sort!
#puts names.count
#puts names

=begin
years= {}
rows.each do |row|
  if row[-3]
    if !years.include?row[0]
      years[row[0]]= row[-3].to_i
    else
      years[row[0]]+= row[-3].to_i
    end
  end
end
=end

#puts years

players= []
count=0
names.each do |name|
  years = drafts = chp = pts = low = goat = earnings = wins = 0
  #puts name
  rows.each do |row|
    solo = row[3] == nil
    next if row[0] =~ /2011/
    if /#{name}/.match(row[2]) || row[3] =~ /#{name}/
      #puts row.join(',') if name =~ /^Alex/
      drafts += row[4] ? row[4].to_i : 0
      chp += 1 if row[10]
      wins += row[11] ? row[11].to_i : 0
      low += 1 if row[13]
      t = row[14] ? row[-3].to_i : 0
      earnings += solo ? t : t/2.0
      pts += 1 if row[15]
      goat += 1 if row[16]
      years +=1
    end
  end
  count +=1
  splits= name.split(" ");
  profile= splits.first[0,2] + splits.last[0,2] + ".jpg"
  profile.downcase!

  if years > 0
    players << {id:count, name:name, years:years, drafts:drafts, chp:chp, low:low, goat:goat, earnings:earnings, wins:wins, pts:pts, profile:profile}
  end
end


players.sort! do |a,b|
    b[:earnings]/b[:years] <=> a[:earnings]/a[:years]
end

count=1
players.each do |player|
  player[:id]= count
  count+= 1
end


players.each do |player|
  puts "new Player (#{player[:id]}, '#{player[:name]}', #{player[:years]}, #{player[:wins]}, #{player[:drafts]}, #{player[:chp]}, #{player[:pts]}, #{player[:low]}, #{player[:goat]}, #{player[:earnings]}, '#{player[:profile]}'),"
end




