class CreateTeams < ActiveRecord::Migration
  def change
    create_table :teams do |t|
      t.string :name
      t.string :school
      t.integer :year
      t.integer :seed
      t.string :region

      t.timestamps
    end
  end
end
