<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->string('title'); 
            $table->text('description')->nullable();

            // حالة المهمة
            $table->enum('status', ['pending', 'in_progress', 'completed'])
                ->default('pending');

            // أولوية المهمة
            $table->enum('priority', ['low', 'medium', 'high'])
                ->default('medium'); 

            // تاريخ الاستحقاق
            $table->date('due_date')->nullable(); 

            // ربط المهمة بالمستخدم
            $table->foreignId('user_id') 
                ->constrained() 
                ->onDelete('cascade'); 
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};
