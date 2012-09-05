# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

require 'csv'

User.delete_all

rows= CSV.read("db/raw.csv")
names=[]
rows.each do |row|
  names << row[2]
  names << row[3]
end

names = names & names
names.compact!
names.sort!
names.each do |name|
  user= User.new
  splits= name.split(' ', 2)
  user.first_name= splits.first
  user.last_name= splits.last
  User.create(email:"#{user.first_name}.#{user.last_name}@mailinator.com", password:"letmein", first_name:user.first_name, last_name:user.last_name)
end

Team.delete_all
rows= CSV.read("db/bracket.csv")
teams=[]
rows.each do |row|
  Team.create(year:2012, seed:row[0],school:row[1], region:row[2])
end
