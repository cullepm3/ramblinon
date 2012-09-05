class FixColumnName < ActiveRecord::Migration
  def change
    rename_column :user_teams, :draft_order, :draft_position
  end
end
